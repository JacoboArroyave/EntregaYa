import React, { useEffect, useState } from "react";
import List from "../components/List";
import { getRestaurants } from "../services/restaurantService";
import { Restaurant } from "../models/Restaurant";
import { Edit, Trash2 } from "lucide-react";

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await getRestaurants();
      setRestaurants(data);
    };

    fetchRestaurants();
  }, []);
  
  const titulo = "List Restaurants";

  const columnas = [
    { name: "id", type: "string" },
    { name: "name", type: "string" },
    { name: "address", type: "string" },
    { name: "phone", type: "string" },
    { name: "email", type: "string" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = (accion: string, item: Restaurant) => {
    if (accion === "editar") {
      console.log("Editar:", item);
    } else if (accion === "eliminar") {
      console.log("Eliminar:", item);
    }
  };

  return (
    <List
      datos={restaurants}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
    />
  );
};

export default RestaurantList;