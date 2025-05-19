import React, { useEffect, useState } from "react";
import List from "../components/List";
import { Edit, Trash2 } from "lucide-react";
import { getCustomers } from "../services/customerServices";
import { Customer } from "../models/Customer";

const DriverList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getCustomers();
      setCustomers(data);
      console.log(customers);
      
    };

    fetchCustomers();
  }, []);
  
  const titulo = "List Drivers"

  const columnas = [
    { name: "id", type: "number",text:"ID" },
    { name: "name", type: "string" ,text:"NOMBRE" },
    { name: "email", type: "string",text:"EMAIL" },
    { name: "phone", type: "string",text:"TELEFONO" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = (accion: string, item: Customer) => {
    if (accion === "editar") {
      console.log("Editar:", item);
    } else if (accion === "eliminar") {
      console.log("Eliminar:", item);
    }
  };

  return (
    <List
      titulo={titulo}
      datos={customers}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
    />
  );
};

export default DriverList;