import React, { useEffect, useState } from "react";
import List from "../../components/List";
import { getMotorcycles, deleteMotorcycle } from "../../services/motorcycleService";
import { Motorcycle } from "../../models/Motorcycle";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const MotorcycleList: React.FC = () => {
  const [Motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

  useEffect(() => {
    const fetchMotorcycles = async () => {
      const data = await getMotorcycles();
      setMotorcycles(data);
    };

    fetchMotorcycles();
  }, []);
  const navigate = useNavigate();

  const titulo = "List Motorcycles"

  const columnas = [
    { name: "id", type: "number",text:"ID" },
    { name: "license_plate", type: "string",text:"PLACA" },
    { name: "brand", type: "string" ,text:"MARCA" },
    { name: "year", type: "number" ,text:"AÑO" },
    { name: "status", type: "string",text:"ESTADO" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = async (accion: string, data: Motorcycle) => {
    console.log("Accion:", accion);
    
    if (accion === "editar") {
      console.log("Hola:", data);
      
      navigate("/action-motorcycle", {
        state: {
          data,
          proceso: "editar",
        },
      });
    } else if (accion === "eliminar") {
      const response = await deleteMotorcycle(data.id);
      if (response) {
        Swal.fire({
          title: "Completado",
          text: `Se ha eliminado la motocicleta correctamente`,
          icon: "success",
          timer: 3000
        });
        window.location.reload();
      } else {
        Swal.fire({
          title: "Error",
          text: `Hubo un problema al eliminar la motocicleta`,
          icon: "error",
          timer: 3000
        });
      }
    }
  };

  return (
    <List
      titulo={titulo}
      datos={Motorcycles}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
      url="/action-motorcycle"
    />
  );
};

export default MotorcycleList;