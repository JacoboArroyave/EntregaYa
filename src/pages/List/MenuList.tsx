import React, { useEffect, useState } from "react";
import List from "../../components/List";
import { getMenus, deleteMenu } from "../../services/menuService";
import { Menu } from "../../models/Menu";
import { Edit, Trash2 } from "lucide-react";
import { string } from "yup";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const MenuList: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenus = async () => {
      const data = await getMenus();
      setMenus(data);
      console.log("Menus:", data[0]["availability"]);
      
    };

    fetchMenus();
  }, []);

  const titulo = "List Menus";

  const columnas = [
    { name: "id", type: "string",text:"ID" },
    { name: "price", type: "number",text:"PRECIO" },
    { name: "availability", type: "boolean",text:"DISPONIBLE" },
    { name: `product`,attribute:"name", type: "object" ,text:"PRODUCTO" },
    { name: `restaurant`,attribute:"name", type: "object" ,text:"RESTAURANTE" },

  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = async (accion: string, data: Menu) => {
    if (accion === "editar") {
      navigate("/action-menu", {
        state: {
          data,
          
        },
      });
    } else if (accion === "eliminar") {
      const response = await deleteMenu(Number(data.id));
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
      datos={menus}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
      url="/action-menu"
    />
  );
};

export default MenuList;