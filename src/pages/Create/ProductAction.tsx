import { useLocation, useNavigate } from "react-router-dom";
import { Product } from "../../models/Product";
import { createProduct, updateProduct } from "../../services/productService";
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
            description: Yup.string().required("La descripción es obligatoria"),
            category: Yup.string().required("La categoría es obligatoria"),
            price: Yup.number().min(0, "El precio debe ser mayor o igual a 0").required("El precio es obligatorio"),
        });
    };

    const handleAction = async (product: Product) => {
        try {
            const result = data
                ? await updateProduct(data.id, product)
                : await createProduct(product);
            if (result) {
                Swal.fire({
                    title: "Completado",
                    text: `Se ha ${data ? 'actualizado' : 'creado'} el registro`,
                    icon: "success",
                    timer: 3000
                });
                navigate("/list-product");
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
                text: `Error al ${proceso} el producto`,
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
                        description: data.description,
                        category: data.category,
                        price: data.price
                    }}
                    validetionSchemaProps={validationschemaProps}
                    labels={[
                        { for: "name", text: "Nombre", type: "text" },
                        { for: "description", text: "Descripción", type: "text" },
                        { for: "category", text: "Categoría", type: "text" },
                        { for: "price", text: "Precio", type: "number" }
                    ]}
                />
            ) : (
                <FormComponent
                    mode={1}
                    handleCreate={handleAction}
                    initialValuesProps={{
                        name: "",
                        description: "",
                        category: "",
                        price: 0
                    }}
                    validetionSchemaProps={validationschemaProps}
                    labels={[
                        { for: "name", text: "Nombre", type: "text" },
                        { for: "description", text: "Descripción", type: "text" },
                        { for: "category", text: "Categoría", type: "text" },
                        { for: "price", text: "Precio", type: "number" }
                    ]}
                />
            )}
        </div>
    );
};

export default App;