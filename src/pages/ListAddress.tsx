import React, { useEffect, useState } from "react";
import List from "../components/List_prueba";
import { getAddresses } from "../services/addressService";
import { Address } from "../models/Address";
import { Edit, Trash2 } from "lucide-react";

const AddressList: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const data = await getAddresses();
      setAddresses(data);
    };

    fetchAddresses();
  }, []);

  const titulo = "List Addresses";

  const columnas = [
    { name: "id", type: "number" },
    { name: "street", type: "string" },
    { name: "city", type: "string" },
    { name: "state", type: "string" },
    { name: "postal_code", type: "string" },
    { name: "additional_info", type: "string" },
    { name: "order_id", type: "number" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = (accion: string, item: Address) => {
    if (accion === "editar") {
      console.log("Editar:", item);
    } else if (accion === "eliminar") {
      console.log("Eliminar:", item);
    }
  };

  return (
    <List
      titulo={titulo}
      datos={addresses}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
    />
  );
};

export default AddressList;
