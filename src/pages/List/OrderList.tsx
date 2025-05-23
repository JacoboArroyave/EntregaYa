import React, { useEffect, useState } from "react";
import List from "../../components/List";
import { Edit, Trash2, Truck } from "lucide-react";
import { deleteOrder, getOrders } from "../../services/orderServices";
import { Order } from "../../models/Order";
import { getMotorcycleById } from "../../services/motorcycleService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
      console.log("Orders:", data[0]["menu"]["product"]["name"]);

    };

    fetchOrders();
  }, []);

  const titulo = "Lista de Pedidos";


  const columnas = [
    { name: "id", type: "number", text: "ID" },
    { name: "quantity", type: "string", text: "Cantidad" },
    { name: "total_price", type: "number", text: "EMAIL" },
    { name: "motorcycle_id", type: "number", text: "Id moto" },
    { name: "menu", attribute: "product", secondAttribute: "name", type: "doubleObject", text: "Producto" },
    { name: "menu", attribute: "restaurant", secondAttribute: "name", type: "doubleObject", text: "Restaurante" },
    { name: "customer", attribute: "name", type: "object", text: "Cliente" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
    { nombre: "seguir-pedido", etiqueta: "Seguir Pedido", icon: Truck },
  ];

  const handleAccion = async (accion: string, data: Order) => {
    if (accion === "editar") {
      console.log("Hola:", data);

      navigate("/update-order", {
        state: {
          data
        },
      });
    } else if (accion === "eliminar") {
      const response = await deleteOrder(data.id);
      if (response) {
        Swal.fire({
          title: "Completado",
          text: `Se ha eliminado del registro`,
          icon: "success",
          timer: 3000
        })
        window.location.reload();
      }
    } else if (accion === "seguir-pedido") {
      console.log("Seguir pedido:", data);

      if (data.motorcycle_id) {
        const moto = await getMotorcycleById(data.motorcycle_id);
        console.log(moto);
        
        if (moto) {
          const plate = moto.license_plate;
          navigate("/MapTracking", {
            state: {
              plate: plate,
            },
          });
        } else {
          alert("Hubo un error al obtener la información de la moto.");
        }
      } else {
        alert("Este pedido no tiene moto asignada.");
      }
    }

  };

  return (
    <List
      titulo={titulo}
      datos={orders}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
    />
  );
};

export default OrderList;