import { Controller, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { OrderDbService } from 'src/order-db/order-db.service';
import { OrderDTO } from '../dto/Order.dto';


@Controller('order')
export class OrderController {
    orderDB:OrderDbService;
    constructor(orderDB: OrderDbService){
        this.orderDB=orderDB;
    }

@MessagePattern('order.status')
  getStatus(id: string): OrderDTO {
    return this.orderDB.getById(id);
  }
@EventPattern('order.submmited')
  addOrder(order: OrderDTO){
      this.orderDB.add(order);
  }

  @EventPattern('order.cancelled')
  cancelOrder(id: string){

      this.orderDB.cancel(id);
  }

  
  @EventPattern('order.preparing')
  updateOrderPreparing(id: string){
      this.orderDB.prepare(id);
  }

  
  @EventPattern('order.delivered')
  updateOrderDelivered(id: string){
      this.orderDB.delivered(id);
  }
}
