import { useEffect, useState } from "react";
import { getRestaurants } from "../../services/restaurantService";
import { Restaurant } from "../../models/Restaurant";
import Cards from "../../components/Cards";
import { Navigate, useNavigate } from "react-router-dom";

const ListRestaurant: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchRestaurants = async () => {
          const data = await getRestaurants();
          console.log(data);
          setRestaurants(data);
          
          
        };

    
        fetchRestaurants();
      }, []);
    const handleClick = (item: Restaurant) => {
        navigate(`/products/${item.id}`);
        
        
        
    }
    return (
        <Cards
        urlPhoto="https://media-cdn.tripadvisor.com/media/photo-s/16/2d/33/8f/el-restaurante-por-fuera.jpg"
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