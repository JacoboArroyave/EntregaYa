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

    // Colores personalizados
    const primaryColor = mode === 1 ? "bg-orange-500 hover:bg-orange-600" : "bg-green-500 hover:bg-green-600";
    const borderColor = mode === 1 ? "border-orange-300" : "border-green-300";
    const focusBorderColor = mode === 1 ? "focus:border-orange-500" : "focus:border-green-500";
    
    return (
        <Formik
            initialValues={object || initialValuesProps}
            validationSchema={validetionSchemaProps()}
            onSubmit={(values) => {
                
                const formattedValues = { ...values };  // Formateo adicional si es necesario
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-8 bg-white rounded-lg shadow-lg border-t-4 border-solid border-0 border-l-0 border-r-0 border-b-0 border-orange-500">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 border-gray-100">
                        {mode === 1 ? "Crear Nuevo" : "Actualizar"}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {labels.map((label: any) => (
                            <div key={label.for} className="flex flex-col">
                                <label htmlFor={label.for} className="block text-sm font-medium text-gray-700 mb-1">
                                    {label.text}
                                </label>
                                <Field 
                                    type={label.type} 
                                    name={label.for} 
                                    className={`w-full border ${borderColor} rounded-md p-3 bg-white shadow-sm ${focusBorderColor} focus:outline-none transition-colors duration-200`} 
                                />
                                <ErrorMessage 
                                    name={label.for} 
                                    component="p" 
                                    className="text-orange-600 text-xs mt-1" 
                                />
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className={`py-3 px-6 text-white font-medium rounded-md ${primaryColor} shadow-md transition-all duration-200 transform hover:translate-y-px`}
                        >
                            {mode === 1 ? "Crear" : "Actualizar"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default FormComponent;