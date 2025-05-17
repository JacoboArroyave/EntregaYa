// FormComponent.tsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import SelectField from "./SelectField"; // 👈 Asegúrate de importar el componente

interface MyFormProps {
  mode: number;
  handleCreate?: (values: any) => void;
  handleUpdate?: (values: any) => void;
  object?: any | null;
  initialValuesProps?: any;
  validetionSchemaProps: () => any;
  labels: any;
}

const FormComponent: React.FC<MyFormProps> = ({
  mode,
  handleCreate,
  handleUpdate,
  object,
  initialValuesProps,
  validetionSchemaProps,
  labels,
}) => {
  const handleSubmit = (formattedValues: any) => {
    if (mode === 1 && handleCreate) {
      handleCreate(formattedValues);
    } else if (mode === 2 && handleUpdate) {
      handleUpdate(formattedValues);
    } else {
      console.error("No function provided for the current mode");
    }
  };

  return (
    <Formik
      initialValues={object || initialValuesProps}
      validationSchema={validetionSchemaProps()}
      onSubmit={(values) => {
        const formattedValues = { ...values };
        handleSubmit(formattedValues);
      }}
    >
      {({ handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md"
        >
          {labels.map((label: any) => (
            <div key={label.for}>
              {label.type === "select" ? (
                <SelectField
                  name={label.for}
                  label={label.text}
                  options={label.options}
                />
              ) : (
                <>
                  <label
                    htmlFor={label.for}
                    className="block text-lg font-medium text-gray-700"
                  >
                    {label.text}
                  </label>
                  <Field
                    type={label.type}
                    name={label.for}
                    className="w-full border rounded-md p-2"
                  />
                  <ErrorMessage
                    name={label.for}
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </>
              )}
            </div>
          ))}

          <button
            type="submit"
            className={`py-2 px-4 text-black rounded-md ${
              mode === 1
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {mode === 1 ? "Crear" : "Actualizar"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
