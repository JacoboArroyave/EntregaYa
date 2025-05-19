import React, { useEffect, useState } from "react";
import List from "../components/List";
import { getDrivers } from "../services/driverService";
import { Driver } from "../models/Driver";
import { Edit, Trash2 } from "lucide-react";

const DriverList: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      const data = await getDrivers();
      setDrivers(data);
    };

    fetchDrivers();
  }, []);
  
  const titulo = "List Drivers"

  const columnas = [
    { name: "id", type: "number" },
    { name: "name", type: "string" },
    { name: "email", type: "string" },
    { name: "license_number", type: "string" },
    { name: "phone", type: "string" },
    { name: "status", type: "string" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = (accion: string, item: Driver) => {
    if (accion === "editar") {
      console.log("Editar:", item);
    } else if (accion === "eliminar") {
      console.log("Eliminar:", item);
    }
  };

  return (
    <List
      titulo={titulo}
      datos={drivers}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
    />
  );
};

export default DriverList;