// ProductCards
import { useEffect, useState } from "react";
import { Restaurant } from "../models/Restaurant";
import Cards from "../components/Cards";
import {  Form, useNavigate, useParams } from "react-router-dom";
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
            if (data.length === 0) {
              navigate(`/`)
            }
            setMenuId(data[0].id);
            console.log("menuId", menuId);  
            
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
        urlPhoto="https://img.hellofresh.com/w_3840,q_auto,f_auto,c_fill,fl_lossy/hellofresh_website/es/cms/SEO/recipes/albondigas-caseras-de-cerdo-con-salsa-barbacoa.jpeg"
        data={products}
        handleClick={handleClick}
        firstAtribute={{ attribute: "description"}}
        secondAtribute={{ attribute: "category" }}
        button="Hacer pedido"
        />
        )
}
export default ProductCards;