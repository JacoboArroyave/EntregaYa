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
        <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col gap-6">
          {/* <!-- Menu Items Table --> */}
          <div className="rounded-lg border border-orange-100 bg-white shadow-md">
            <div className="border-b border-orange-200 px-6 py-4 bg-gradient-to-r from-orange-500 to-green-500">
              <h3 className="font-medium text-xl text-white">
                Menú Disponible
              </h3>
            </div>
            <div className="flex flex-col gap-4 p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-sm text-white uppercase bg-orange-400">
                    <tr>
                      {columnas.map((item) => (
                        <th scope="col" className="px-6 py-3 rounded-t-lg" key={item.name}>{item.name}</th>
                      ))}
                      <th scope="col" className="px-6 py-3 rounded-t-lg">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datos.map((item, index) => (
                      <tr
                        className="bg-white border-b hover:bg-orange-50 transition-colors"
                        key={index}
                      >
                        {columnas.map((col) => (
                          <td className="px-6 py-4" key={col.name}>{item[col.name]}</td>
                        ))}
                        <td className="px-6 py-4 flex space-x-3">
                          {acciones.map((accion) => (
                            <button
                              key={accion.nombre}
                              onClick={() => onAccion(accion.nombre, item)}
                              className="text-white bg-orange-500 hover:bg-orange-600 rounded-full p-2 transition-colors"
                            >
                              <accion.icon size={16} />
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