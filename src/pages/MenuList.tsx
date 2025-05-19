import React, { useEffect, useState } from "react";
import List from "../components/List";
import { getMenus } from "../services/menuService";
import { Menu } from "../models/Menu";
import { Edit, Trash2 } from "lucide-react";
import { string } from "yup";

const MenuList: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

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

  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = (accion: string, item: Menu) => {
    if (accion === "editar") {
      console.log("Editar:", item);
    } else if (accion === "eliminar") {
      console.log("Eliminar:", item);
    }
  };

  return (
    <List
      titulo={titulo}
      datos={menus}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
    />
  );
};

export default MenuList;