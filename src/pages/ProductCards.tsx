import { useEffect, useState } from "react";
import { Restaurant } from "../models/Restaurant";
import Cards from "../components/Cards";
import {  useNavigate, useParams } from "react-router-dom";
import { getMenusByIdRestaurant } from "../services/menuService";
import { Product } from "../models/Product";

const ProductCards: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]); 
    const {id}=useParams<{ id: string }>();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMenuByIdRestaurant = async () => {
          if (id !== undefined) {
            const data = await getMenusByIdRestaurant(id);
            console.log("data", data);
            if (data.length === 0) {
              navigate(`/`)
            }
            
            const products = data.map((menu) => (menu.product));
            setProducts(products);
          }
        };

    
        fetchMenuByIdRestaurant();
      }, [id]);
    const handleClick = (item: Product) => {
        console.log(item);
    }
    return (
        <Cards
        title="hola"
        data={products}
        handleClick={handleClick}
        firstAtribute={{ attribute: "description"}}
        secondAtribute={{ attribute: "category", icon: "📍" }}
        button="Agregar al carrito"
        />
        )
}
export default ProductCards;