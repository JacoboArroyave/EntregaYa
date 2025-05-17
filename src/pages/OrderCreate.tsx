import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";

import FormComponent from "../components/FormComponent";
import { getShifts } from "../services/shiftService";
import { getDrivers } from "../services/driverService";
import { getMotorcycles } from "../services/motorcycleService";
import { createOrder } from "../services/orderServices";

const OrderCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Recibimos datos enviados por location.state
  const { menu_id, customer_id, precio_product } = location.state || {};

  // Estados para datos de turnos, conductores y motos
  const [shifts, setShifts] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [motorcycles, setMotorcycles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [shiftsData, driversData, motorcyclesData] = await Promise.all([
          getShifts(),
          getDrivers(),
          getMotorcycles(),
        ]);
        setShifts(shiftsData);
        setDrivers(driversData);
        setMotorcycles(motorcyclesData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    }
    fetchData();
  }, []);

  if (!menu_id || !customer_id || !precio_product) {
    return <p>Faltan datos para crear la orden.</p>;
  }

  if (!shifts.length || !drivers.length || !motorcycles.length) {
    return <p>Cargando datos...</p>;
  }

  const getDriverName = (id: number) => {
    const d = drivers.find((drv) => drv.id === id);
    return d?.name || "Desconocido";
  };

  const getMotoName = (id: number) => {
    const m = motorcycles.find((moto) => moto.id === id);
    return m?.license_plate || "Desconocida";
  };

  const labels = [
    { for: "quantity", text: "Cantidad", type: "number" },
    {
      for: "shift_id",
      text: "Turno (conductor y moto)",
      type: "select",
      options: shifts.map((s) => ({
        value: s.id,
        label: `${getDriverName(s.driver_id)} - ${getMotoName(s.motorcycle_id)}`,
      })),
    },
  ];

  const initialValuesProps = {
    quantity: 1,
    shift_id: shifts[0].id,
  };

  const validationSchema = Yup.object({
    quantity: Yup.number().min(1, "Debe ser mayor a 0").required("Requerido"),
    shift_id: Yup.number().required("Selecciona un turno"),
  });

  const handleCreate = async (values: any) => {
    const newOrder = {
      customer_id,
      menu_id,
      quantity: values.quantity,
      totalPrice: values.quantity * precio_product,
      status: "pendiente",
      shift_id: values.shift_id,
    };

    try {
      const result = await createOrder(newOrder);
      console.log("Resultado de createOrder:", result);
      if (result?.id) {
        alert("Orden creada correctamente");
        console.log("Navegando a /address/create con id:", result.id);
        navigate("/address/create", { state: { id: result.id } });
      } else {
        alert("Error al crear la orden");
      }
    } catch (error) {
      console.error(error);
      alert("Error al crear la orden");
    }
  };

  return (
    <FormComponent
      mode={1}
      handleCreate={handleCreate}
      initialValuesProps={initialValuesProps}
      validetionSchemaProps={() => validationSchema}
      labels={labels}
    />
  );
};

export default OrderCreate;
