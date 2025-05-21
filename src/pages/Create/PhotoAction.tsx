import { useLocation, useNavigate } from "react-router-dom";
import { createPhoto, updatePhoto } from "../../services/photoServices";
import Swal from 'sweetalert2';
import FormComponent from "../../components/FormComponent";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getIssues } from "../../services/IssueServices";

const App: React.FC = () => {
    const location = useLocation();
    const { data } = location.state || {};
    const navigate = useNavigate();
    const [issues, setIssues] = useState<any[]>([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const dataIssues = await getIssues()
                setIssues(dataIssues)
                console.log(dataIssues);

            } catch (error) {
                console.error("Error cargando datos:", error);
            }
        }
        fetchData();
    }, []);



    const validationschemaProps = () => {
        return Yup.object({
            caption: Yup.string().required("La descripción es obligatoria"),
            image: Yup.mixed().required("La imagen es obligatoria"),
            issues: Yup.number().required("Selecciona un problema"),

        });
    };
    const labels = [
        { for: "caption", text: "Descripción", type: "text" },
        { for: "image", text: "Imagen", type: "file" },
        {
            for: "issues",
            text: "Problemas",
            type: "select",
            options: issues.map((s) => ({
                value: s.id,
                label: s.id,
            })),
        },
    ]
    const handleAction = async (photo: any) => {
        try {
            // Construir el objeto para la API (no FormData, sino objeto plano)
            const photoPayload: any = {
                caption: photo.caption,
                // El backend espera image_url, pero aquí solo se envía el nombre del archivo
                image_url: typeof photo.image === 'string' ? photo.image : (photo.image?.name || ""),
                issue_id: 1
            };
            let result;
            if (data) {
                result = await updatePhoto(data.id, photoPayload);
            } else {
                result = await createPhoto(photoPayload);
            }
            console.log(result);

            if (result) {
                Swal.fire({
                    title: "Completado",
                    text: `Se ha ${data ? 'actualizado' : 'creado'} la foto`,
                    icon: "success",
                    timer: 3000
                });
                navigate("/list-photo");
            } else {
                Swal.fire({
                    title: "Error",
                    text: `Existe un problema de  la foto`,
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: `Error del proceso de la  foto`,
                icon: "error",
                timer: 3000
            });
        }
    };
   

    return (
        <div>
            {data ? (
                <FormComponent
                    mode={2}
                    handleUpdate={handleAction}
                    initialValuesProps={{
                        caption: data.caption,
                        image: null,
                        issues: data.issue_id

                    }}
                    validetionSchemaProps={validationschemaProps}
                    labels={labels}
                />
            ) : (
                <FormComponent
                    mode={1}
                    handleCreate={handleAction}
                    initialValuesProps={{
                        caption: "",
                        image: null,
                        issues: 0

                    }}
                    validetionSchemaProps={validationschemaProps}
                    labels={labels}
                />
            )}
        </div>
    );
};

export default App;