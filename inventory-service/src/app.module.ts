import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryController } from './inventory/inventory.controller';
import { InventoryDbService } from './inventory-db/inventory-db.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  controllers: [AppController, InventoryController],
  providers: [AppService, InventoryDbService],
})
export class AppModule {}
