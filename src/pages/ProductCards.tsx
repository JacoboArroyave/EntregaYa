import { useEffect, useState } from "react";
import { Restaurant } from "../models/Restaurant";
import Cards from "../components/Cards";
import {  useNavigate, useParams } from "react-router-dom";
import { getMenusByIdRestaurant } from "../services/menuService";
import { Product } from "../models/Product";
import { useSelector } from "react-redux";

const ProductCards: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]); 
    const {id}=useParams<{ id: string }>();
    const navigate = useNavigate();
    const customer=useSelector((state:any) => state.customer.customer);
    const [menuId,setMenuId]=useState<string>("");
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
      console.log(menuId,item,customer.id);
      
      
    }
    return (
        <Cards
        title="hola"
        data={products}
        handleClick={handleClick}
        firstAtribute={{ attribute: "description"}}
        secondAtribute={{ attribute: "category" }}
        button="Agregar al carrito"
        />
        )
}
export default ProductCards;