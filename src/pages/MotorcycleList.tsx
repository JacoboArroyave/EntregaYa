import React, { useEffect, useState } from "react";
import List from "../components/List_prueba";
import { getMotorcycles } from "../services/motorcycleService";
import { Motorcycle } from "../models/Motorcycle";
import { Edit, Trash2 } from "lucide-react";

const MotorcycleList: React.FC = () => {
  const [Motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

  useEffect(() => {
    const fetchMotorcycles = async () => {
      const data = await getMotorcycles();
      setMotorcycles(data);
    };

    fetchMotorcycles();
  }, []);
  
  const titulo = "List Motorcycles"

  // id: number;
// license_plate: string;
// brand: string;
// year: number;
// status: string;
  const columnas = [
    { name: "id", type: "number" },
    { name: "license_plate", type: "string" },
    { name: "brand", type: "string" },
    { name: "year", type: "number" },
    { name: "status", type: "string" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = (accion: string, item: Motorcycle) => {
    if (accion === "editar") {
      console.log("Editar:", item);
    } else if (accion === "eliminar") {
      console.log("Eliminar:", item);
    }
  };

  return (
    <List
      titulo={titulo}
      datos={Motorcycles}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
    />
  );
};

export default MotorcycleList;