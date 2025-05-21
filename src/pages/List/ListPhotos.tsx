import React, { useEffect, useState } from "react";
import List from "../../components/List";
import { Edit, Trash2 } from "lucide-react";
import { Photo } from "../../models/Photo";
import { deletePhoto, getPhotos } from "../../services/photoServices";
import PhotoGallery from "../../components/GalleryPhotos";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddressList: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const navigate=useNavigate()
  const location = useLocation();
  
  const { id_issue } = location.state || {};
  useEffect(() => {
    const fetchPhotos = async () => {
      let data = await getPhotos();
      if (id_issue) {
        data = data.filter((photo: Photo) => photo.issue_id === id_issue);
      }
      setPhotos(data);
      if (data.length > 0) {
        console.log("Fotos:", data[0].image_url.split("\\").pop());
      }
    };

    fetchPhotos();
  }, []);

  const titulo = "Lista de fotos";



  const acciones = [
    { nombre: "editar", etiqueta: "Editar", icon: Edit },
    { nombre: "eliminar", etiqueta: "Eliminar", icon: Trash2 },
  ];
const handleAccion = async (accion: string, data: Photo) => {
    if (accion === "editar") {
      navigate("/action-photo", {
        state: {
          data,
        },
      });

    } else if (accion === "eliminar") {
      const response = await deletePhoto(data.id);
      if (response) {
        Swal.fire({
          title: "Completado",
          text: `Se ha creado eliminado el registro`,
          icon: "success",
          timer: 3000
        })
        console.log("Restaurante creado con éxito:", response);
        window.location.reload();
      }
    }
  };

  return (
    <PhotoGallery
      title={titulo}
      photos={photos}

      acciones={acciones}
      onAccion={handleAccion}
      url="/action-photo"
    />
  );
};

export default AddressList;
