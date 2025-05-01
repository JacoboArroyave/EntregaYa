import { Product } from './Product.ts';
import { Restaurant } from './Restaurant';

export interface Menu {
    id: string;
    price:number;
    availability:number;
    restaurant: Restaurant;
    products: Product[];
}

