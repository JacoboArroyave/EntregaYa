import { useNavigate, } from "react-router-dom";
import { Restaurant } from "../models/Restaurant";
import { createRestaurant } from "../services/restaurantService";
import Swal from 'sweetalert2';
import FormComponent from "../components/FormComponent";
import * as Yup from "yup";



const App = () => {
    console.log("hola");

    const navigate = useNavigate();
    const validationschemaProps = () => {
        return Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
            adress: Yup.string().required("La direccion es obligatoria"),
            phone: Yup.string()
                .matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
                .required("El teléfono es obligatorio"),
            email: Yup.string().email("Email inválido").required("El email es obligatorio"),
        })

    }
    const handleCreate = async (restaurant: Restaurant) => {
        try {
            const createdRestaurant = await createRestaurant(restaurant);
            if (createdRestaurant) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                })
                console.log("Restaurante creado con éxito:", createdRestaurant);
                navigate("/list-restaurant");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                })
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de crear el registro",
                icon: "error",
                timer: 3000
            })
        }

    }
    return (
        <div >
            <h2>Create Restaurant</h2>
            <FormComponent
                mode={1}
                handleCreate={handleCreate}
                initialValuesProps={{ name: "", address: "", phone: "", email: "" }}
                validetionSchemaProps={validationschemaProps}
                labels={[
                    { for: "name", text: "Nombre", type: "text" },
                    { for: "address", text: "Direccion", type: "text" },
                    { for: "phone", text: "Telefono", type: "text" },
                    { for: "email", text: "Email", type: "text" }
                ]}
            />
        </div>
    );
}
export default App;