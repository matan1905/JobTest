import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderDTO } from '../dto/Order.dto';

@Injectable()
export class ChefService {
    constructor( @Inject('MESSAGING_SERVICE') private client: ClientProxy){}

    orderQueue: OrderDTO[] =[];
    working= false;
    addToQueue(order: OrderDTO) {
        this.orderQueue.push(order);
        if(!this.working) this.processQueue();
    }

    async processQueue(){
        this.working=true;
        var order =this.orderQueue.shift();
        this.client.emit('order.preparing',order.id);
        for (const pizza of order.pizzas) {
            await new Promise((resolve,reject) => setTimeout(resolve,Math.random()*3000+3000));
            var enoughInventory = await new Promise((resolve,reject)=> {
            this.client.send<boolean>('inventory.reserve',pizza.toppings).subscribe(b=> resolve(b));});
            if(!enoughInventory){
                this.client.emit('order.cancelled',order.id)
                this.nextOrder();
                return;
            }
        }
        this.client.emit('order.delivered',order.id);
        this.nextOrder();
     } 

     nextOrder(){
        if(this.orderQueue.length>0) this.processQueue();
        else this.working=false;
     }
        
}

    

