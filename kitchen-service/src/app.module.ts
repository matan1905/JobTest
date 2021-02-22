import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KitchenController } from './kitchen/kitchen.controller';
import { ChefService } from './chef/chef.service';

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
  controllers: [AppController, KitchenController],
  providers: [AppService, ChefService],
})
export class AppModule {}
