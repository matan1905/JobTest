import { BadRequestException, Body, Controller,Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {timeout} from 'rxjs/operators'
import { OrderDTO, OrderStatus } from '../dto/Order.dto';
import { v4 as uuidv4 } from 'uuid';


@Controller('order')
export class OrderController {

    constructor( @Inject('MESSAGING_SERVICE') private client: ClientProxy,){ }

    @Get(':id')
    getOrder(@Param('id') id : string): Observable<OrderDTO> {
         return this.client.send<OrderDTO>("order.status",id).pipe(timeout(5000));
    }

    @Post()
    submitOrder(@Body() order: OrderDTO): OrderDTO {
        order.id= uuidv4();
        order.status=OrderStatus.SUBMMITED
        //if(!order.pizzas) throw new BadRequestException();
        this.client.emit('order.submmited',order);
        return order;
    }
}

