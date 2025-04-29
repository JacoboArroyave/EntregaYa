import { Product } from './Product.ts';
import { Restaurant } from './Restaurant';

export interface Menu {
    id: string;
    restaurant: Restaurant;
    products: Product[];
}

