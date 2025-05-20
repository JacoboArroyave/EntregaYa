import { Product } from './Product.ts';
import { Restaurant } from './Restaurant';

export interface Menu {
    id?: string;
    price:number;
    availability:boolean;
    restaurant?: Restaurant;
    restaurant_id: number;
    product_id: number;
    product?: Product;
}

