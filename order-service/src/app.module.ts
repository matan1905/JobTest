import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderController } from './order/order.controller';
import { OrderDbService } from './order-db/order-db.service';

@Module({
  imports: [],
  controllers: [AppController, OrderController],
  providers: [AppService, OrderDbService],
})
export class AppModule {}
