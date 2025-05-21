import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import FormComponent from "../../components/FormComponent";

import { getMotorcycles } from "../../services/motorcycleService";
import { getInfringements } from "../../services/InfringementMotorcycle";
import { MotorcycleInfringements } from "../../models/MotorcycleInfringement";
import { createMotorcycleInfringement } from "../../services/InfringementMotorcycle";

const MotorcycleInfringementCreate = () => {
  const [infringements, setInfringements] = useState<any[]>([]);
  const [motorcycles, setMotorcycles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [infringementData, motorcycleData] = await Promise.all([
          getInfringements(),
          getMotorcycles(),
        ]);
        setInfringements(infringementData);
        setMotorcycles(motorcycleData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    }
    fetchData();
  }, []);

  if (!infringements.length || !motorcycles.length) {
    return <p className="p-4">Cargando datos...</p>;
  }

  const labels = [
    { for: "date", text: "Fecha", type: "datetime-local" },
    {
      for: "infrigement_id",
      text: "Infracción",
      type: "select",
      options: infringements.map((i) => ({
        value: i.id,
        label: i.name,
      })),
    },
    {
      for: "motorcycles_id",
      text: "Motocicleta",
      type: "select",
      options: motorcycles.map((m) => ({
        value: m.id,
        label: m.license_plate,
      })),
    },
  ];

  const initialValuesProps = {
    date: "",
    infrigement_id: infringements[0].id,
    motorcycles_id: motorcycles[0].id,
  };

  const validationSchema = Yup.object({
    date: Yup.string().required("La fecha es requerida"),
    infrigement_id: Yup.number().required("La infracción es requerida"),
    motorcycles_id: Yup.number().required("La motocicleta es requerida"),
  });

  const handleAction = async (values: any) => {
    const newEntry: MotorcycleInfringements = {
      date: values.date,
      infrigement_id: values.infrigement_id,
      motorcycles_id: values.motorcycles_id,
    };

    try {
      const result = await createMotorcycleInfringement(newEntry);
      console.log("Creado exitosamente:", result);
      alert("Infracción registrada correctamente.");
    } catch (error) {
      console.error("Error al crear infracción:", error);
      alert("Ocurrió un error al registrar la infracción.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Registrar Infracción a Motocicleta</h2>
      <FormComponent
        mode={1}
        handleCreate={handleAction}
        initialValuesProps={initialValuesProps}
        validetionSchemaProps={() => validationSchema}
        labels={labels}
      />
    </div>
  );
};

export default MotorcycleInfringementCreate;
