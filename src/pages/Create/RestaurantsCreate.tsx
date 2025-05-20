import { useLocation, useNavigate, } from "react-router-dom";
import { Restaurant } from "../../models/Restaurant";
import { createRestaurant, updateRestaurant } from "../../services/restaurantService";
import Swal from 'sweetalert2';
import FormComponent from "../../components/FormComponent";
import * as Yup from "yup";




const App:React.FC = () => {
    const location = useLocation();
    const {data,proceso}=location.state||{};
    console.log(data,proceso,"data");
    
    const navigate = useNavigate();
    const validationschemaProps = () => {
        return Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
            address: Yup.string().required("La direccion es obligatoria"),
            phone: Yup.string()
                .matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
                .required("El teléfono es obligatorio"),
            email: Yup.string().email("Email inválido").required("El email es obligatorio"),
        })

    }
    const handleAction = async (restaurant: Restaurant) => {
        try {
            console.log(data);
            
            const createdRestaurant =data? await updateRestaurant(data.id,restaurant):await createRestaurant(restaurant);
            if (createdRestaurant) {
                Swal.fire({
                    title: "Completado",
                    text: `Se ha creado ${proceso} el registro`,
                    icon: "success",
                    timer: 3000
                })
                console.log("Restaurante creado con éxito:", createdRestaurant);
                navigate("/list-restaurant");
            } else {
                console.log("hello");
                
                Swal.fire({
                    title: "Error",
                    text: `Existe un problema al momento de ${proceso} el registro` ,
                    icon: "error",
                    timer: 3000
                })
            }
        } catch (error) {
            console.log(error);
            
            Swal.fire({
                title: "Error",
                text: `Error al ${proceso} el restaurante`,
                icon: "error",
                timer: 3000
            })
        }

    }
    return (
        <div >
            {data?
            <FormComponent
                mode={2}
                handleUpdate={handleAction}
                initialValuesProps={{ name: data.name, address: data.address, phone: data.phone, email: data.email }}
                validetionSchemaProps={validationschemaProps}
                labels={[
                    { for: "name", text: "Nombre", type: "text" },
                    { for: "address", text: "Direccion", type: "text" },
                    { for: "phone", text: "Telefono", type: "text" },
                    { for: "email", text: "Email", type: "text" }
                ]}
            />:<FormComponent
                mode={1}
                handleCreate={handleAction}
                initialValuesProps={{ name: "", address: "", phone: "", email: "" }}
                validetionSchemaProps={validationschemaProps}
                labels={[
                    { for: "name", text: "Nombre", type: "text" },
                    { for: "address", text: "Direccion", type: "text" },
                    { for: "phone", text: "Telefono", type: "text" },
                    { for: "email", text: "Email", type: "text" }
                ]}
            />}
            
        </div>
    );
}
export default App;