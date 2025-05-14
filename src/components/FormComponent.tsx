import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
interface MyFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: any) => void;
    handleUpdate?: (values: any) => void;
    object?: any | null;
    initialValuesProps?: any;
    validetionSchemaProps: () => any;
    labels: any
}
const FormComponent: React.FC<MyFormProps> = ({ mode, handleCreate, handleUpdate, object, initialValuesProps, validetionSchemaProps, labels }) => {

    const handleSubmit = (formattedValues: any) => {
        console.log("que tal");
        
        if (mode === 1 && handleCreate) {
            console.log("Crear", formattedValues);
            
            handleCreate(formattedValues);  // Si `handleCreate` está definido, lo llamamos
        } else if (mode === 2 && handleUpdate) {
            handleUpdate(formattedValues);  // Si `handleUpdate` está definido, lo llamamos
        } else {
            console.error('No function provided for the current mode');
        }
    };
    return (
        <Formik
            initialValues={object || { initialValuesProps }}

            validationSchema={validetionSchemaProps()}
            onSubmit={(values) => {
                
                const formattedValues = { ...values };  // Formateo adicional si es necesario
                handleSubmit(formattedValues);
            }}

        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {labels.map((label: any) => (

                        <div key={label.for} >
                            <label htmlFor={label.for} className="block text-lg font-medium text-gray-700">{label.text}</label>
                            <Field type={label.type} name={label.for} className="w-full border rounded-md p-2" />
                            <ErrorMessage name={label.for} component="p" className="text-red-500 text-sm" />
                        </div>
                    ))}

                    
                    {/* Botón de enviar */}
                    <button
                        type="submit"
                        className={`py-2 px-4 text-black rounded-md ${mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                    >
                        {mode === 1 ? "Crear" : "Actualizar"}
                    </button>
                </Form>
            )}
        </Formik>
    )
}
export default FormComponent;