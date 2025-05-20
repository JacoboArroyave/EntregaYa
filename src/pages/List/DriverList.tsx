import React, { useEffect, useState } from "react";
import List from "../../components/List";
import { getDrivers, deleteDriver } from "../../services/driverService";
import { Driver } from "../../models/Driver";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const DriverList: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      const data = await getDrivers();
      setDrivers(data);
    };

    fetchDrivers();
  }, []);
  
  const titulo = "List Drivers"

  const columnas = [
    { name: "id", type: "number",text:"ID" },
    { name: "name", type: "string" ,text:"NOMBRE" },
    { name: "email", type: "string",text:"EMAIL" },
    { name: "license_number", type: "string",text:"NUMERO DE LICENCIA" },
    { name: "phone", type: "string",text:"TELEFONO" },
    { name: "status", type: "string",text:"ESTADO" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = async (accion: string, item: Driver) => {
    if (accion === "editar") {
      navigate("/action-driver", {
        state: {
          data: item,
          proceso: "editar",
        },
      });
    } else if (accion === "eliminar") {
      const response = await deleteDriver(item.id);
      if (response) {
        Swal.fire({
          title: "Completado",
          text: `Se ha eliminado el conductor correctamente`,
          icon: "success",
          timer: 3000
        });
        setDrivers((prev) => prev.filter((driver) => driver.id !== item.id));
      } else {
        Swal.fire({
          title: "Error",
          text: `Hubo un problema al eliminar el conductor`,
          icon: "error",
          timer: 3000
        });
      }
    }
  };

  return (
    <List
      titulo={titulo}
      datos={drivers}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
      url="/action-driver"
    />
  );
};

export default DriverList;