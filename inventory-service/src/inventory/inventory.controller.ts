import { Controller,Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';
import { InventoryDbService } from 'src/inventory-db/inventory-db.service';
import { ToppingDTO } from '../dto/Topping.dto';
import {OrderDTO} from '../dto/Order.dto'


@Controller('inventory')
export class InventoryController {

    constructor( private inventoryDB: InventoryDbService,@Inject('MESSAGING_SERVICE') private client: ClientProxy){}


    @MessagePattern('inventory.reserve')
    reserve(toppings: ToppingDTO[]){
        return this.inventoryDB.reserve(toppings)
    }

    @EventPattern('order.cancelled')
    cancelReservation(id: string){
          this.client.send<OrderDTO>('order.status',id).subscribe(order=>{
            if(order.pizzas)  
            order.pizzas.forEach(pizza => {
            this.inventoryDB.cancel(pizza.toppings)
        })});
    }

    @EventPattern('order.delivered')
    commitReservation(id: string){
        this.client.send<OrderDTO>('order.status',id).subscribe(order=>{
            if(order.pizzas)  
            order.pizzas.forEach(pizza => {
            this.inventoryDB.commit(pizza.toppings)
        })});
        
    }

}
