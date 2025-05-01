import { Product } from './Product.ts';
import { Restaurant } from './Restaurant';

export interface Menu {
<<<<<<< HEAD
    id: string;
    price:number;
    availability:number;
    restaurant: Restaurant;
    products: Product[];
=======
    id:number;
    price:number;
    availability: boolean;
    restaurant_id: Restaurant;
    products_id: Product[];
>>>>>>> 5d89f87d235fe0fe9872c49ed897cf826bf4569a
}

