import React, { useEffect, useState } from "react";
import List from "../../components/List";
import { getProducts, deleteProduct } from "../../services/productService";
import { Product } from "../../models/Product";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);
  
  const titulo = "List Products";

  const columnas = [
    { name: "id", type: "string",text:"ID" },
    { name: "name", type: "string",text:"NOMBRE" },
    { name: "description", type: "string" ,text:"DESCRIPCION" },
    { name: "category", type: "string" ,text:"CATEGORIA" },
  ];

  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = async (accion: string, data: Product) => {
    if (accion === "editar") {
      navigate("/action-product", {
        state: {
          data,
          proceso: "editar",
        },
      });
    } else if (accion === "eliminar") {
      const response = await deleteProduct(data.id);
      if (response) {
        Swal.fire({
          title: "Completado",
          text: `Se ha eliminado el producto correctamente`,
          icon: "success",
          timer: 3000
        });
        window.location.reload();
      } else {
        Swal.fire({
          title: "Error",
          text: `Hubo un problema al eliminar el producto`,
          icon: "error",
          timer: 3000
        });
      }
    }
  };

  return (
    <List
      titulo={titulo}
      datos={products}
      columnas={columnas}
      acciones={acciones}
      onAccion={handleAccion}
      url="/action-product"
    />
  );
};

export default ProductList;