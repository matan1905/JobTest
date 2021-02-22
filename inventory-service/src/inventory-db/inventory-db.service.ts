import { Injectable } from '@nestjs/common';
import { throws } from 'assert';
import { ToppingDTO } from '../dto/Topping.dto';


@Injectable()
export class InventoryDbService {
     
     inventory: Map<string,number>= new Map();
     reserved: Map<string,number>= new Map();

     constructor(){
         this.inventory.set("onion",5);
         this.inventory.set("pineapple",0);
         this.inventory.set("cheese",2);
         this.inventory.set("olives",14);
     }

    reserve(toppings: ToppingDTO[]) :boolean{
        for (const top of toppings) {
             if(this.inventory.get(top.name) <1) return false;
        }

         //now that we are sure we have the orders (NOTE: in a real project this function should be atomic or implemented diffrently)
         toppings.forEach(top => {
             this.inventory.set(top.name, this.inventory.get(top.name)-1)
             var alreadyRes=this.reserved.get(top.name)?this.reserved.get(top.name):0;
             this.reserved.set(top.name,alreadyRes+1)
         });
         return true;
     }
    
     commit(toppings: ToppingDTO[]){
         if(toppings)
         toppings.forEach(top => {
             this.reserved.set(top.name, this.reserved.get(top.name)-1)
         });

     }

     cancel(toppings: ToppingDTO[]){
        if(toppings) 
        toppings.forEach(top => {
            if(this.reserved.get(top.name)>0){
             this.reserved.set(top.name, this.reserved.get(top.name)-1)
             this.inventory.set(top.name, this.inventory.get(top.name)+1)
            }
         });
     }


}
