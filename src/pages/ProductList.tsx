import React, { useEffect, useState } from "react";
import List from "../components/List";
import { getProducts } from "../services/productService";
import { Product } from "../models/Product";
import { Edit, Trash2 } from "lucide-react";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);
  
  const titulo = "List Products";

  const columnas = [
    { name: "id", type: "string" },
    { name: "name", type: "string" },
    { name: "description", type: "string" },
    { name: "category", type: "string" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = (accion: string, item: Product) => {
    if (accion === "editar") {
      console.log("Editar:", item);
    } else if (accion === "eliminar") {
      console.log("Eliminar:", item);
    }
  };

  return (
    <List
      titulo={titulo}
      datos={products}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
    />
  );
};

export default ProductList;