import { LucideProps } from "lucide-react";
import React from "react";

interface ListProps {
    datos: any[];
    columnas: {name:string,type:string}[];
    acciones: { nombre: string; etiqueta: string ;icon:any}[];
    onAccion: (accion: string,item:any) => void;
}

const List: React.FC<ListProps> = ({ datos, columnas, acciones, onAccion }) => {

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                {/* <!-- Input Fields --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Listado
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        {columnas.map((item) => (
                                            
                                            <th scope="col" className="px-6 py-3">{item.name}</th>
                                        ))}
                                    </tr>

                                </thead>
                                <tbody>
                                    {datos.map((item, index) => (
                                        <tr
                                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                                            key={index}
                                        >
                                            {columnas.map((col) => (
                                                <td className="px-6 py-4" key={col.name}>{item[col.name]}</td>
                                            ))}
                                            <td className="px-6 py-4 space-x-2">
                                                {acciones.map((accion) => (
                                                    <button
                                                        key={accion.nombre}
                                                        onClick={() => onAccion(accion.nombre, item )}
                                                        className="text-blue-600 dark:text-blue-500"
                                                        >
                                                        <accion.icon size={20}/>

                                                    </button>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default List;
