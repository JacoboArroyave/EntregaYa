import { useLocation, useNavigate } from "react-router-dom";
import { Motorcycle } from "../../models/Motorcycle";
import { createMotorcycle, updateMotorcycle } from "../../services/motorcycleService";
import Swal from 'sweetalert2';
import FormComponent from "../../components/FormComponent";
import * as Yup from "yup";

const App: React.FC = () => {
    const location = useLocation();
    const { data, proceso } = location.state || {};
    const navigate = useNavigate();

    const validationschemaProps = () => {
        return Yup.object({
            license_plate: Yup.string().required("La placa es obligatoria"),
            brand: Yup.string().required("La marca es obligatoria"),
            year: Yup.number().min(1900, "Año inválido").max(new Date().getFullYear(), "Año inválido").required("El año es obligatorio"),
            status: Yup.string().required("El estado es obligatorio"),
        });
    };

    const handleAction = async (motorcycle: Motorcycle) => {
        try {
            const result = data
                ? await updateMotorcycle(data.id, motorcycle)
                : await createMotorcycle(motorcycle);
            if (result) {
                Swal.fire({
                    title: "Completado",
                    text: `Se ha ${data ? 'actualizado' : 'creado'} el registro`,
                    icon: "success",
                    timer: 3000
                });
                navigate("/list-motorcycle");
            } else {
                Swal.fire({
                    title: "Error",
                    text: `Existe un problema al momento de ${proceso} el registro`,
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: `Error al ${proceso} la motocicleta`,
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
                        license_plate: data.license_plate,
                        brand: data.brand,
                        year: data.year,
                        status: data.status
                    }}
                    validetionSchemaProps={validationschemaProps}
                    labels={[
                        { for: "license_plate", text: "Placa", type: "text" },
                        { for: "brand", text: "Marca", type: "text" },
                        { for: "year", text: "Año", type: "number" },
                        { for: "status", text: "Estado", type: "text" }
                    ]}
                />
            ) : (
                <FormComponent
                    mode={1}
                    handleCreate={handleAction}
                    initialValuesProps={{
                        license_plate: "",
                        brand: "",
                        year: new Date().getFullYear(),
                        status: ""
                    }}
                    validetionSchemaProps={validationschemaProps}
                    labels={[
                        { for: "license_plate", text: "Placa", type: "text" },
                        { for: "brand", text: "Marca", type: "text" },
                        { for: "year", text: "Año", type: "number" },
                        { for: "status", text: "Estado", type: "text" }
                    ]}
                />
            )}
        </div>
    );
};

export default App;