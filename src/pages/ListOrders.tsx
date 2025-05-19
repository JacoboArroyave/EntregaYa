import React, { useEffect, useState } from "react";
import List from "../components/List";
import { getOrders, deleteOrder } from "../services/orderServices";
import { Order } from "../models/Order";
import { Edit, Trash2 } from "lucide-react";

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      console.log("Datos recibidos:", data);

      // Aplanar datos: traer nombre y placa directamente al anivel superior
      const ordenesFormateadas = data.map((order) => ({
        ...order,
        name_customer: order.customer?.name ?? "Sin nombre",
        motorcycle_id: order.motorcycle_id ?? "N/A",
      }));
      setOrders(ordenesFormateadas);
    };

    fetchOrders();
  }, []);
  const titulo = "List Orders";

  const columnas = [
    { name: "id", type: "number" },
    { name: "quantity", type: "number" },
    { name: "total_price", type: "number" },
    { name: "status", type: "string" },
    { name: "motorcycle_id", type: "string" }, //
    { name: "name_customer", type: "string" }, // 
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = async (accion: string, item: Order) => {
    if (accion === "editar") {
      console.log("Editar:", item);
    } else if (accion === "eliminar") {
      const confirmado = window.confirm(
        "¿Estás seguro de que deseas eliminar esta orden?"
      );
      if (confirmado) {
        const exito = await deleteOrder(item.id.toString());
        if (exito) {
          setOrders((prev) => prev.filter((order) => order.id !== item.id));
          console.log("Orden eliminada:", item.id);
        } else {
          alert("Error al eliminar la orden.");
        }
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
