import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import FormComponent from "../../components/FormComponent";

import { createMenu } from "../../services/menuService";
import { Motorcycle } from "../../models/Motorcycle";
import { getMotorcycles } from "../../services/motorcycleService";
import { createIssue, updateIssue } from "../../services/IssueServices";

const MenuCreate = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { data } = location.state || {}; // location es un objeto que contiene información sobre la URL actual
    // Recibimos datos enviados por location.state

    // Estados para datos de turnos, conductores y motos
    const [motorcycle, setmotorcycle] = useState<Motorcycle[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [motorcycleData,] = await Promise.all([

                    getMotorcycles(),
                ]);
                setmotorcycle(motorcycleData);
            } catch (error) {
                console.error("Error cargando datos:", error);
            }
        }
        fetchData();
    }, []);



    if (!motorcycle.length) {
        return <p>Cargando datos...</p>;
    }
    const getMotorcyclePlate = (id: number) => {
        const d = motorcycle.find((mot) => mot.id === id);
        return d?.license_plate || "Desconocido";
    };


    const labels = [
        { for: "description", text: "Descripcion", type: "string" },
        { for: "issue_type", text: "Tipo de problema", type: "string" },
        { for: "status", text: "Estado", type: "string" },
        {
            for: "motorcycle_id",
            text: "Moto",
            type: "select",
            options: motorcycle.map((s) => ({
                value: s.id,
                label: getMotorcyclePlate(s.id),
            })),
        },

    ];

    const initialValuesProps = {
        description: data?data.description:"",
        issue_type: data ? data.issue_type : "",
        status: data ? data.status : "",
        motorcycle_id: data ? data.motorcycle_id : motorcycle[0].id,
    };

    const validationSchema = Yup.object({
       description: Yup.string().required("La descripcion es obligatorio"),
       issue_type: Yup.string().required("El tipo es obligatorio"),
       status: Yup.string().required("El estado es obligatorio"),
       motorcycle_id: Yup.number().required("Selecciona una moto"),
    });

    const handleAction = async (values: any) => {

        const newIssue: any = {
            description: values.description,
            issue_type: values.issue_type,
            status: values.status,
            motorcycle_id: values.motorcycle_id,
        };


        try {

            const result: any = data ? await updateIssue(data.id, newIssue) : await createIssue(newIssue);
            console.log("Resultado de nuevo issue:", result);

            navigate("/list-issue");

        } catch (error) {
            console.error(error);
            console.log("Error al crear el issue", error);

        }
    };

    return (
        <div>
            {data ? <FormComponent
                mode={2}
                handleUpdate={handleAction}
                initialValuesProps={initialValuesProps}
                validetionSchemaProps={() => validationSchema}
                labels={labels}
            /> :
                <FormComponent
                    mode={1}
                    handleCreate={handleAction}
                    initialValuesProps={initialValuesProps}
                    validetionSchemaProps={() => validationSchema}
                    labels={labels}
                />
            }
        </div>
    );
};

export default MenuCreate;
