import React, { useEffect, useState } from "react";
import List from "../../components/List";
import { Edit, Trash2 } from "lucide-react";
import { getIssues } from "../../services/IssueServices";
import { Issue } from "../../models/Issue";

const AddressList: React.FC = () => {
  const [Issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const data = await getIssues();
      setIssues(data);
    };

    fetchIssues();
  }, []);

  const titulo = "Lista de direcciones";

  const columnas = [
    { name: "id", type: "number",text:"ID" },
    { name: "street", type: "string" ,text:"CALLE" },
    { name: "city", type: "string" ,  text:"CIUDAD" },
    { name: "state", type: "string" ,text:"ESTADO" },
    { name: "postal_code", type: "string" ,text:"CODIGO POSTAL" },
    { name: "additional_info", type: "string" ,text:"INFORMACION ADICIONAL" },
    { name: "order_id", type: "number",text:"ID PEdido" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = (accion: string, item: Issue) => {
    if (accion === "editar") {
      console.log("Editar:", item);
    } else if (accion === "eliminar") {
      console.log("Eliminar:", item);
    }
  };

  return (
    <List
      titulo={titulo}
      datos={Issues}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
    />
  );
};

export default AddressList;
