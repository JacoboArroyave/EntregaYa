import React, { useEffect, useState } from "react";
import List from "../components/List";
import { getRestaurants } from "../services/restaurantService";
import { Restaurant } from "../models/Restaurant";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await getRestaurants();
      setRestaurants(data);
      console.log("Restaurantes:", restaurants);
    };

    fetchRestaurants();
  }, []);
  
  const titulo = "Lista de restaurantes";

  const columnas = [
    { name: "id", type: "string" ,text:"ID" },
    { name: "name", type: "string",text:"NOMBRE" },
    { name: "address", type: "string",text:"DIRECCION" },
    { name: "phone", type: "string",text:"TELEFONO" },
    { name: "email", type: "string",text:"EMAIL" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = (accion: string, item: Restaurant) => {
    if (accion === "editar") {
      navigate("/create-restaurant")
    } else if (accion === "eliminar") {
      console.log("Eliminar:", item);
    }
  };

  return (
    <List
      titulo={titulo}
      datos={restaurants}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
    />
  );
};

export default RestaurantList;