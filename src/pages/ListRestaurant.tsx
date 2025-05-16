import { useEffect, useState } from "react";
import { getRestaurants } from "../services/restaurantService";
import { Restaurant } from "../models/Restaurant";
import Cards from "../components/Cards";
import { Navigate, useNavigate } from "react-router-dom";

const ListRestaurant: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchRestaurants = async () => {
          const data = await getRestaurants();
          setRestaurants(data);
          
        };

    
        fetchRestaurants();
      }, []);
    const handleClick = (item: Restaurant) => {
        navigate(`/products/${item.id}`);
        
        
    }
    return (
        <Cards
        title="hola"
        data={restaurants}
        handleClick={handleClick}
        firstAtribute={{ attribute: "email", icon: "📧" }}
        secondAtribute={{ attribute: "address", icon: "📍" }}
        thirdAtribute={{ attribute: "phone", icon: "📞" }}
        button="🍽️ Ver productos"
        />
        )
}
export default ListRestaurant;