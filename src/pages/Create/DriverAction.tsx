import { useLocation, useNavigate } from "react-router-dom";
import { Driver } from "../../models/Driver";
import { createDriver, updateDriver } from "../../services/driverService";
import Swal from 'sweetalert2';
import FormComponent from "../../components/FormComponent";
import * as Yup from "yup";

const App: React.FC = () => {
    const location = useLocation();
    const { data, proceso } = location.state || {};
    const navigate = useNavigate();

    const validationschemaProps = () => {
        return Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
            license_number: Yup.string().required("El número de licencia es obligatorio"),
            phone: Yup.string()
                .matches(/^[0-9]{10}$/, "El teléfono debe tener 10 dígitos")
                .required("El teléfono es obligatorio"),
            email: Yup.string().email("Email inválido").required("El email es obligatorio"),
            status: Yup.string().required("El estado es obligatorio"),
        });
    };

    const handleAction = async (driver: Driver) => {
        try {
            const result = data
                ? await updateDriver(data.id, driver)
                : await createDriver(driver);
            if (result) {
                Swal.fire({
                    title: "Completado",
                    text: `Se ha ${data ? 'actualizado' : 'creado'} el registro`,
                    icon: "success",
                    timer: 3000
                });
                navigate("/list-driver");
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
                text: `Error al ${proceso} el conductor`,
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
                        name: data.name,
                        license_number: data.license_number,
                        phone: data.phone,
                        email: data.email,
                        status: data.status
                    }}
                    validetionSchemaProps={validationschemaProps}
                    labels={[
                        { for: "name", text: "Nombre", type: "text" },
                        { for: "license_number", text: "Número de Licencia", type: "text" },
                        { for: "phone", text: "Teléfono", type: "text" },
                        { for: "email", text: "Email", type: "text" },
                        { for: "status", text: "Estado", type: "text" }
                    ]}
                />
            ) : (
                <FormComponent
                    mode={1}
                    handleCreate={handleAction}
                    initialValuesProps={{
                        name: "",
                        license_number: "",
                        phone: "",
                        email: "",
                        status: ""
                    }}
                    validetionSchemaProps={validationschemaProps}
                    labels={[
                        { for: "name", text: "Nombre", type: "text" },
                        { for: "license_number", text: "Número de Licencia", type: "text" },
                        { for: "phone", text: "Teléfono", type: "text" },
                        { for: "email", text: "Email", type: "text" },
                        { for: "status", text: "Estado", type: "text" }
                    ]}
                />
            )}
        </div>
    );
};

export default App;