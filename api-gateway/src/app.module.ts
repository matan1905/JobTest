import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderController } from './order/order.controller';
import {ClientsModule, Transport} from '@nestjs/microservices'

@Module({
  imports: [
    ClientsModule.register([
      { name: 'MESSAGING_SERVICE', 
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222',
        }},
    ])
    
  ],
  controllers: [AppController, OrderController],
  providers: [AppService],
})
export class AppModule {}
