import { Product } from './Product.ts';
import { Restaurant } from './Restaurant';

export interface Menu {
    id:number;
    price:number;
    availability: boolean;
    restaurant_id: Restaurant;
    products_id: Product[];
}

