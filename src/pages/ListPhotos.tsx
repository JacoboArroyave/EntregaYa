import React, { useEffect, useState } from "react";
import List from "../components/List";
import { Edit, Trash2 } from "lucide-react";
import { Photo } from "../models/Photo";
import { getPhotos } from "../services/photoServices";
import PhotoGallery from "../components/GalleryPhotos";

const AddressList: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const data = await getPhotos();
      setPhotos(data);
     console.log("Fotos:", data[0].image_url.split("\\").pop());

      

    };

    fetchPhotos();
  }, []);

  const titulo = "Lista de fotos";



  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];

  const handleAccion = (accion: string, item: Photo) => {
    if (accion === "editar") {
      console.log("Editar:", item);
    } else if (accion === "eliminar") {
      console.log("Eliminar:", item);
    }
  };

  return (
    <PhotoGallery
      title={titulo}
      photos={photos}

      // acciones={acciones}
      // onAccion={handleAccion}
    />
  );
};

export default AddressList;
