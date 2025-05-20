import { useLocation, useNavigate } from "react-router-dom";
import { Customer } from "../../models/Customer";
import { createCustomer, updateCustomer } from "../../services/customerServices";
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
            phone: Yup.string()
                .matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
                .required("El teléfono es obligatorio"),
            email: Yup.string().email("Email inválido").required("El email es obligatorio"),
        });
    };

    const handleAction = async (customer: Customer) => {
        try {
            const result = data
                ? await updateCustomer(data.id, customer)
                : await createCustomer(customer);
            if (result) {
                Swal.fire({
                    title: "Completado",
                    text: `Se ha ${data ? 'actualizado' : 'creado'} el registro`,
                    icon: "success",
                    timer: 3000
                });
                navigate("/list-customer");
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
                text: `Error al ${proceso} el cliente`,
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
                        phone: data.phone,
                        email: data.email
                    }}
                    validetionSchemaProps={validationschemaProps}
                    labels={[
                        { for: "name", text: "Nombre", type: "text" },
                        { for: "phone", text: "Teléfono", type: "text" },
                        { for: "email", text: "Email", type: "text" }
                    ]}
                />
            ) : (
                <FormComponent
                    mode={1}
                    handleCreate={handleAction}
                    initialValuesProps={{
                        name: "",
                        phone: "",
                        email: ""
                    }}
                    validetionSchemaProps={validationschemaProps}
                    labels={[
                        { for: "name", text: "Nombre", type: "text" },
                        { for: "phone", text: "Teléfono", type: "text" },
                        { for: "email", text: "Email", type: "text" }
                    ]}
                />
            )}
        </div>
    );
};

export default App;