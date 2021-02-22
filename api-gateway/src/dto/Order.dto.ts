import {PizzaDTO} from './Pizza.dto'

export class OrderDTO {
    id: string;
    readonly pizzas: PizzaDTO[];
    status:OrderStatus = OrderStatus.SUBMMITED;
    
}

export enum OrderStatus {
    SUBMMITED="Submitted", PREPARING="In Preparation", CANCELLED="Cancelled", DELIVERED="Delivered"
}