import React, { useEffect, useState } from "react";
import List from "../../components/List";
import { Edit, Trash2 } from "lucide-react";
import { deleteShift, getShifts } from "../../services/shiftService";
import { Shift } from "../../models/Shift";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ShiftsList: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShifts = async () => {
      const data = await getShifts();
      setShifts(data);
    };
    fetchShifts();
  }, []);

  const titulo = "Lista de Turnos";

  const columnas = [
    { name: "id", type: "number", text: "ID" },
    { name: "driver",attribute:"name", type: "object", text: "ID Conductor" },
    { name: "motorcycle",attribute:"license_plate", type: "object", text: "ID Moto" },
    { name: "start_time", type: "string", text: "Inicio" },
    { name: "end_time", type: "string", text: "Fin" },
    { name: "status", type: "string", text: "Estado" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = async (accion: string, data: Shift) => {
    if (accion === "editar") {
      navigate("/action-shift", {
        state: { data },
      });
    } else if (accion === "eliminar") {
      const response = await deleteShift(data.id);
      if (response) {
        Swal.fire({
          title: "Completado",
          text: `Se ha eliminado del registro`,
          icon: "success",
          timer: 3000,
        });
        window.location.reload();
      }
    }
  };

  return (
    <List
      titulo={titulo}
      datos={shifts}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
      url="/action-shift"
    />
  );
};

export default ShiftsList;