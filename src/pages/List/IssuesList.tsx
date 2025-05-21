import React, { useEffect, useState } from "react";
import List from "../../components/List";
import { getMenus, deleteMenu } from "../../services/menuService";
import { Menu } from "../../models/Menu";
import { Edit, Trash2 } from "lucide-react";
import { string } from "yup";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { Issue } from "../../models/Issue";
import { deleteIssue, getIssues } from "../../services/IssueServices";

const MenuList: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenus = async () => {
      const data = await getIssues();
      setIssues(data);
      
      
    };

    fetchMenus();
  }, []);

  const titulo = "List Menus";

  const columnas = [
    { name: "id", type: "string",text:"ID" },
    { name: "description", type: "string",text:"Descripcion" },
    { name: "issue_type", type: "string",text:"Tipo" },
    { name: `motorcycle_id`,type:"number" ,text:"Moto id" },
    { name: `photos`, type: "photos" ,text:"Fotos" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = async (accion: string, data: Issue) => {
    if (accion === "editar") {
      navigate("/action-issues", {
        state: {
          data,
          
        },
      });
    } else if (accion === "eliminar") {
      const response = await deleteIssue(data.id);
      if (response) {
        Swal.fire({
          title: "Completado",
          text: `Se ha eliminado el menú correctamente`,
          icon: "success",
          timer: 3000
        });
        window.location.reload();
      } else {
        Swal.fire({
          title: "Error",
          text: `Hubo un problema al eliminar el menú`,
          icon: "error",
          timer: 3000
        });
      }
    }
  };

  return (
    <List
      titulo={titulo}
      datos={issues}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
      url="/action-issues"
    />
  );
};

export default MenuList;