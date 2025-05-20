import React, { useEffect, useState } from "react";
import List from "../../components/List";
import { getOrders, deleteOrder } from "../../services/orderServices";
import { Order } from "../../models/Order";
import { Edit, Trash2 } from "lucide-react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);
  const titulo = "List Orders";

  const columnas = [
    { name: "id", type: "number", text: "ID" },
    { name: "quantity", type: "number", text: "Cantidad" },
    { name: "totalPrice", type: "number", text: "Precio Total" },
    { name: "status", type: "string", text: "Estado" },
    { name: "motorcycle_id", type: "string", text: "Moto" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

const handleAccion = async (accion: string, data: Order) => {
    if (accion === "editar") {
      navigate("/action-order", {
        state: {
          data,
          proceso: "editar",
        },
      });
    } else if (accion === "eliminar") {
      const response = await deleteOrder(String(data.id));
      if (response) {
        Swal.fire({
          title: "Completado",
          text: `Se ha eliminado el registro correctamente`,
          icon: "success",
          timer: 3000
        });
        // Refrescar la lista sin recargar toda la página
        setOrders((prev) => prev.filter((order) => order.id !== data.id));
      } else {
        Swal.fire({
          title: "Error",
          text: `Hubo un problema al eliminar el registro`,
          icon: "error",
          timer: 3000
        });
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
      url="order"
    />
  );
};

export default OrderList;
