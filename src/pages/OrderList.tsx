import React, { useEffect, useState } from "react";
import List from "../components/List";
import { Edit, Trash2 } from "lucide-react";
import { getOrders } from "../services/orderServices";
import { Order } from "../models/Order";
import { getMotorcycleById } from "../services/motorcycleService";

const DriverList: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);


  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
      console.log("Orders:", data[0]["menu"]["product"]["name"]);
      
    };
    
    fetchOrders();
  }, []);
  
  const titulo = "List Drivers"

 
  const columnas = [
    { name: "id", type: "number",text:"ID" },
    { name: "quantity", type: "string" ,text:"NOMBRE" },
    { name: "total_price", type: "number",text:"EMAIL" },
    { name: "motorcycle_id", type: "number",text:"Id moto" },
    { name: "menu",attribute:"product" ,secondAttribute:"name",type: "doubleObject",text:"Producto" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = (accion: string, item: Order) => {
    if (accion === "editar") {
      console.log("Editar:", item);
    } else if (accion === "eliminar") {
      console.log("Eliminar:", item);
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

export default DriverList;