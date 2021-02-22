import { Injectable } from '@nestjs/common';
import { OrderDTO, OrderStatus } from '../dto/Order.dto';

@Injectable()
export class OrderDbService {
    orders: OrderDTO[]=[];

    getById(id:string) : OrderDTO{
        return this.orders.find(o => o.id===id)
    }

    add(order:OrderDTO){
        this.orders.push(order);
    }

    cancel(id:string){
        this.orders.find(o=>o.id===id).status=OrderStatus.CANCELLED;
    }

    prepare(id:string){
        this.orders.find(o=>o.id===id).status=OrderStatus.PREPARING;
    }

    delivered(id:string){
        this.orders.find(o=>o.id===id).status=OrderStatus.DELIVERED;
    }
}
