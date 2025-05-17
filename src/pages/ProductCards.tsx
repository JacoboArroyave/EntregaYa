import { useEffect, useState } from "react";
import { Restaurant } from "../models/Restaurant";
import Cards from "../components/Cards";
import {  Form, useNavigate, useParams } from "react-router-dom";
import { getMenusByIdRestaurant } from "../services/menuService";
import { Product } from "../models/Product";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const ProductCards: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]); 
    const {id}=useParams<{ id: string }>();
    const navigate = useNavigate();
    const customer = useSelector((state:any) => state.customer.customer) 
    const customer_id = customer?.id;



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
            
            const products = data.map((menu) => ({
              ...menu.product,  // copia todas las propiedades del producto
              menu_id: menu.id, // añade el id del menú para que quede ligado al producto
            }));
            setProducts(products);
          }
        };

    
        fetchMenuByIdRestaurant();
      }, [id]);

      const handleClick = (item: Product & { menu_id?: number }) => {
  const menu_id = item.menu_id;
  if (!menu_id || !customer_id) {
    alert("Faltan datos");
    return;
  }
  // Navegamos pasando datos por location.state
  navigate("/order/create", {
    state: {
      menu_id,
      customer_id,
      precio_product: item.price,  // aquí asumo que el producto tiene un campo price
    },
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