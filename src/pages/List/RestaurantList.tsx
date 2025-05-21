import React, { useEffect, useState } from "react";
import List from "../../components/List";
import { deleteRestaurant, getRestaurants } from "../../services/restaurantService";
import { Restaurant } from "../../models/Restaurant";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await getRestaurants();
      setRestaurants(data);
      console.log("Restaurantes:", data);
    };

    fetchRestaurants();
  }, []);

  const titulo = "Lista de restaurantes";

  const columnas = [
    { name: "id", type: "string", text: "ID" },
    { name: "name", type: "string", text: "NOMBRE" },
    { name: "address", type: "string", text: "DIRECCION" },
    { name: "phone", type: "string", text: "TELEFONO" },
    { name: "email", type: "string", text: "EMAIL" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];
  const proceso: string = "Actualizar";
  const handleAccion = async (accion: string, data: Restaurant) => {
    if (accion === "editar") {
      console.log("Hola:", data);
      navigate("/action-restaurant", {
        state: {
          data,
          proceso,
        },
      });

    } else if (accion === "eliminar") {
      const response = await deleteRestaurant(data.id);
      if (response) {
        Swal.fire({
          title: "Completado",
          text: `Se ha creado ${proceso} el registro`,
          icon: "success",
          timer: 3000
        })
        console.log("Restaurante creado con éxito:", response);
        window.location.reload();
      }
    }
  };

  return (
    <List
      titulo={titulo}
      datos={restaurants}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
      url="/action-restaurant"
    />
  );
};

export default RestaurantList;