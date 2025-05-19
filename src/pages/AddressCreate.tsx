// AddressCreate
import { Address } from "../models/Address";
import { createAddress } from "../services/addressService";
import * as Yup from "yup";
import FormComponent from "../components/FormComponent";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NotificationAlert from "../components/NotificationAlert";
import { useState } from "react";

const CreateAddressPage = () => {
  const location = useLocation();
  const { id: orderId, plate } = location.state || {};
  const navigate = useNavigate(); // ← usar navigate
  const [showAlert, setShowAlert] = useState(false);

  const initialValues: Omit<Address, "id"> = {
    street: "",
    city: "",
    state: "",
    postal_code: "",
    additional_info: "",
    order_id: orderId ?? 0, // ← prellenar si se recibió
  };

  const validationSchema = () =>
    Yup.object({  
      street: Yup.string().required("La calle es obligatoria"),
      city: Yup.string().required("La ciudad es obligatoria"),
      state: Yup.string().required("El estado es obligatorio"),
      postal_code: Yup.string().required("El código postal es obligatorio"),
      additional_info: Yup.string(),
      order_id: Yup.number()
        .required("El ID de la orden es obligatorio")
        .positive("Debe ser mayor que cero"),
    });

  const labels = [
    { for: "street", type: "text", text: "Calle" },
    { for: "city", type: "text", text: "Ciudad" },
    { for: "state", type: "text", text: "Departamento / Estado" },
    { for: "postal_code", type: "text", text: "Código Postal" },
    { for: "additional_info", type: "text", text: "Información Adicional" },
  ];

  const handleCreate = async (values: Omit<Address, "id">) => {
    const created = await createAddress(values);
    if (created) {
      // Sonido
      const audio = new Audio("/alert.mp3");
      audio.play();

      // Mostrar alerta visual
      setShowAlert(true);

      // Esperar y navegar
      setTimeout(() => {
        navigate("/MapTracking", {
          state: {
            plate: plate,
          },
        });
      }, 3000);
    } else {
      alert("Hubo un error al crear la dirección");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 relative">
      <h1 className="text-2xl font-bold mb-6">Crear Nueva Dirección</h1>
      <FormComponent
        mode={1}
        handleCreate={handleCreate}
        initialValuesProps={initialValues}
        validetionSchemaProps={validationSchema}
        labels={labels}
      />

      {showAlert && (
        <NotificationAlert
          message={`Nuevo pedido asignado con placa ${plate}`}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default CreateAddressPage;
