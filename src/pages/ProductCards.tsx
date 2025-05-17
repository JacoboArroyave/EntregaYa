// ProductCards
import { useEffect, useState } from "react";
import { Restaurant } from "../models/Restaurant";
import Cards from "../components/Cards";
import { useParams } from "react-router-dom";
import { getMenusByIdRestaurant } from "../services/menuService";
import { Product } from "../models/Product";
import { useNavigate } from "react-router-dom";

const ProductCards: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]); 
    const {id}=useParams<{ id: string }>();
    const navigate = useNavigate(); // ← usar navigate
    
    useEffect(() => {
        const fetchMenuByIdRestaurant = async () => {
          if (id !== undefined) {
            const data = await getMenusByIdRestaurant(id);
            console.log("data", data);
            
            const products = data.map((menu) => (menu.product));
            setProducts(products);
          }
        };

    
        fetchMenuByIdRestaurant();
      }, [id]);


    const handleClick = (item: Product) => {
    navigate("/address/create", {
      state: { id }, // ← enviar ID por estado
    });
  };
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