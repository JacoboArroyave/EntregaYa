import React, { useEffect, useState } from "react";
import List from "../components/List_prueba";
import { getMenus } from "../services/menuService";
import { Menu } from "../models/Menu";
import { Edit, Trash2 } from "lucide-react";

const MenuList: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const data = await getMenus();
      setMenus(data);
    };

    fetchMenus();
  }, []);
  
  const titulo = "List Menus";

  const columnas = [
    { name: "id", type: "string" },
    { name: "price", type: "number" },
    { name: "availability", type: "number" },
    { name: "restaurant", type: "object" },
    { name: "products", type: "array" },
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