import { useLocation, useNavigate } from "react-router-dom";
import { Address } from "../../models/Address";
import { createAddress, updateAddress } from "../../services/addressService";
import Swal from 'sweetalert2';
import FormComponent from "../../components/FormComponent";
import * as Yup from "yup";

const App: React.FC = () => {
    const location = useLocation();
    const { data, proceso } = location.state || {};
    const navigate = useNavigate();

    const validationschemaProps = () => {
        return Yup.object({
            street: Yup.string().required("La calle es obligatoria"),
            city: Yup.string().required("La ciudad es obligatoria"),
            state: Yup.string().required("El estado es obligatorio"),
            postal_code: Yup.string().required("El código postal es obligatorio"),
            additional_info: Yup.string(),
        });
    };

    const handleAction = async (address: Address) => {
        try {
            const result = data
                ? await updateAddress(data.id, address)
                : await createAddress(address);
            if (result) {
                Swal.fire({
                    title: "Completado",
                    text: `Se ha ${data ? 'actualizado' : 'creado'} el registro`,
                    icon: "success",
                    timer: 3000
                });
                navigate("/list-address");
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
                text: `Error al ${proceso} la dirección`,
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
                        street: data.street,
                        city: data.city,
                        state: data.state,
                        postal_code: data.postal_code,
                        additional_info: data.additional_info
                    }}
                    validetionSchemaProps={validationschemaProps}
                    labels={[
                        { for: "street", text: "Calle", type: "text" },
                        { for: "city", text: "Ciudad", type: "text" },
                        { for: "state", text: "Estado", type: "text" },
                        { for: "postal_code", text: "Código Postal", type: "text" },
                        { for: "additional_info", text: "Información Adicional", type: "text" }
                    ]}
                />
            ) : (
                <FormComponent
                    mode={1}
                    handleCreate={handleAction}
                    initialValuesProps={{
                        street: "",
                        city: "",
                        state: "",
                        postal_code: "",
                        additional_info: ""
                    }}
                    validetionSchemaProps={validationschemaProps}
                    labels={[
                        { for: "street", text: "Calle", type: "text" },
                        { for: "city", text: "Ciudad", type: "text" },
                        { for: "state", text: "Estado", type: "text" },
                        { for: "postal_code", text: "Código Postal", type: "text" },
                        { for: "additional_info", text: "Información Adicional", type: "text" }
                    ]}
                />
            )}
        </div>
    );
};

export default App;