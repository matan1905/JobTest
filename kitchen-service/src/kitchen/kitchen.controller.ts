import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { of } from 'rxjs';
import { ChefService } from 'src/chef/chef.service';
import {OrderDTO} from '../dto/Order.dto'

@Controller('kitchen')
export class KitchenController {
    constructor( @Inject('MESSAGING_SERVICE') private client: ClientProxy,
      private chef: ChefService){ }

@EventPattern('order.submmited')
  processOrder(order: OrderDTO){
      if(order.pizzas)
      this.chef.addToQueue(order);
      else this.client.emit('order.cancelled',order.id);
  }

}
