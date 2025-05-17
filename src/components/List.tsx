import { LucideProps } from "lucide-react";
import React, { useState } from "react";

interface ListProps {
  datos: any[];
  columnas: { name: string; type: string }[];
  acciones: { nombre: string; etiqueta: string; icon: React.ElementType<LucideProps> }[];
  onAccion: (accion: string, item: any) => void;
  titulo?: string;
  emptyMessage?: string;
}

const List: React.FC<ListProps> = ({
  datos,
  columnas,
  acciones,
  onAccion,
  titulo = "Menú Disponible",
  emptyMessage = "No hay platillos disponibles"
}) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<{index: number, action: string} | null>(null);

  // Combinación de colores naranja-verde
  const primaryOrange = "from-orange-400 to-orange-600";
  const primaryGreen = "from-green-400 to-green-600";
  
  return (
    <div className="rounded-xl bg-white shadow-xl overflow-hidden border-0 relative">
      {/* Barra decorativa superior con los colores naranja y verde */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-green-500"></div>
      
      {/* Encabezado con fondo naranja */}
      <div className={`px-8 py-5 bg-gradient-to-r ${primaryOrange}`}>
        <h3 className="font-bold text-xl text-white tracking-wide flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          {titulo}
        </h3>
      </div>

      {/* Contenedor de tabla con fondo blanco */}
      <div className="p-5 bg-white">
        <div className="overflow-x-auto rounded-xl shadow-sm">
          <table className="w-full text-sm border-separate border-spacing-0 bg-white rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-orange-50 to-green-50 text-gray-700 uppercase text-xs tracking-wider">
                {columnas.map((item) => (
                  <th 
                    scope="col" 
                    className="px-6 py-4 font-semibold text-left" 
                    key={item.name}
                  >
                    {item.name}
                  </th>
                ))}
                {acciones.length > 0 && (
                  <th scope="col" className="px-6 py-4 font-semibold text-center">
                    ACCIONES
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {datos.length > 0 ? (
                datos.map((item, index) => (
                  <tr
                    className={`transition-all duration-300 ${
                      hoveredRow === index 
                        ? "bg-orange-50/70 shadow-sm" 
                        : "bg-white hover:bg-green-50/30"
                    }`}
                    key={index}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {columnas.map((col) => (
                      <td 
                        className="px-6 py-4 whitespace-nowrap" 
                        key={col.name}
                      >
                        {col.type === "image" ? (
                          <div className="p-1 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full inline-block">
                            <img 
                              src={item[col.name]} 
                              alt="Platillo" 
                              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                          </div>
                        ) : col.type === "price" ? (
                          <div className="font-medium text-green-800 bg-green-50 px-4 py-1 rounded-full inline-block shadow-sm">
                            ${typeof item[col.name] === 'number' 
                              ? item[col.name].toFixed(2) 
                              : item[col.name]}
                          </div>
                        ) : col.type === "category" ? (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 shadow-sm border border-orange-200/50">
                            {item[col.name]}
                          </span>
                        ) : (
                          <span className="text-gray-800 font-medium">{item[col.name]}</span>
                        )}
                      </td>
                    ))}
                    {acciones.length > 0 && (
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center space-x-4">
                          {acciones.map((accion) => (
                            <div className="relative" key={accion.nombre}>
                              <button
                                onClick={() => onAccion(accion.nombre, item)}
                                onMouseEnter={() => setActiveTooltip({index, action: accion.nombre})}
                                onMouseLeave={() => setActiveTooltip(null)}
                                className={`text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-200 transform hover:scale-110 hover:shadow-lg active:scale-95 ${
                                  accion.nombre.toLowerCase().includes('delete') || accion.nombre.toLowerCase().includes('eliminar')
                                    ? 'bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700' 
                                    : accion.nombre.toLowerCase().includes('edit') || accion.nombre.toLowerCase().includes('editar')
                                      ? 'bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700'
                                      : accion.nombre.toLowerCase().includes('view') || accion.nombre.toLowerCase().includes('ver')
                                        ? 'bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700'
                                        : 'bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700'
                                }`}
                              >
                                <accion.icon size={18} className="drop-shadow-sm" />
                              </button>
                              
                              {/* Tooltip con colores actualizados */}
                              {activeTooltip?.index === index && activeTooltip?.action === accion.nombre && (
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-600 to-orange-700 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap z-10 shadow-lg animate-fadeIn">
                                  {accion.etiqueta}
                                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-700 rotate-45"></div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td 
                    colSpan={columnas.length + (acciones.length > 0 ? 1 : 0)} 
                    className="px-6 py-10 text-center text-gray-800 bg-gradient-to-b from-white to-orange-50/30"
                  >
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="w-16 h-16 mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                        <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <p className="text-base font-medium">{emptyMessage}</p>
                      <p className="text-orange-600 text-sm mt-1">Intenta agregar nuevos elementos</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Indicador de cantidad de registros */}
        {datos.length > 0 && (
          <div className="mt-4 text-right text-sm text-gray-500">
            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
              {datos.length} {datos.length === 1 ? "registro" : "registros"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;