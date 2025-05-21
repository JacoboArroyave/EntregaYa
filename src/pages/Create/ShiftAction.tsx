import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import FormComponent from "../../components/FormComponent";
import { createShift, updateShift } from "../../services/shiftService";
import { getDrivers } from "../../services/driverService";
import { getMotorcycles } from "../../services/motorcycleService";

const ShiftAction = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};

    const [drivers, setDrivers] = useState<any[]>([]);
    const [motorcycles, setMotorcycles] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [driversData, motorcyclesData] = await Promise.all([
                    getDrivers(),
                    getMotorcycles(),
                ]);
                setDrivers(driversData);
                setMotorcycles(motorcyclesData);
            } catch (error) {
                console.error("Error cargando datos:", error);
            }
        }
        fetchData();
    }, []);

    if (!drivers.length || !motorcycles.length) {
        return <p>Cargando datos...</p>;
    }

    const labels = [
        {
            for: "driver_id",
            text: "Conductor",
            type: "select",
            options: drivers.map((d) => ({ value: d.id, label: d.name })),
        },
        {
            for: "motorcycle_id",
            text: "Motocicleta",
            type: "select",
            options: motorcycles.map((m) => ({ value: m.id, label: m.license_plate })),
        },
        { for: "start_time", text: "Inicio de turno", type: "datetime-local" },
        { for: "end_time", text: "Fin de turno", type: "datetime-local" },
        { for: "status", text: "Estado", type: "text" },
    ];

    const initialValuesProps = {
        driver_id: data ? data.driver_id : drivers[0].id,
        motorcycle_id: data ? data.motorcycle_id : motorcycles[0].id,
        start_time: data ? data.start_time : "",
        end_time: data ? data.end_time : "",
        status: data ? data.status : "activo",
    };

    const validationSchema = Yup.object({
        driver_id: Yup.number().required("Selecciona un conductor"),
        motorcycle_id: Yup.number().required("Selecciona una motocicleta"),
        start_time: Yup.string().required("Requerido"),
        end_time: Yup.string().required("Requerido"),
        status: Yup.string().required("Requerido"),
    });

    const handleAction = async (values: any) => {
        try {
            const shiftData = {
                driver_id: values.driver_id,
                motorcycle_id: values.motorcycle_id,
                start_time: values.start_time,
                end_time: values.end_time,
                status: values.status,
            };
            const result: any = data
                ? await updateShift(data.id, shiftData)
                : await createShift(shiftData);
            if (result?.id) {
                navigate("/list-shifts");
            } else {
                alert("Error al guardar el turno");
            }
        } catch (error) {
            console.error(error);
            alert("Error al guardar el turno");
        }
    };

    return (
        <div>
            {data ? (
                <FormComponent
                    mode={2}
                    handleUpdate={handleAction}
                    initialValuesProps={initialValuesProps}
                    validetionSchemaProps={() => validationSchema}
                    labels={labels}
                />
            ) : (
                <FormComponent
                    mode={1}
                    handleCreate={handleAction}
                    initialValuesProps={initialValuesProps}
                    validetionSchemaProps={() => validationSchema}
                    labels={labels}
                />
            )}
        </div>
    );
};

export default ShiftAction;
