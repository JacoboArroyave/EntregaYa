import { LucideProps } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ListProps {
  datos: any[];
  columnas: { name: string, attribute?: string, secondAttribute?: string, type: string, text: string }[];
  acciones: { nombre: string; etiqueta: string; icon: React.ElementType<LucideProps> }[];
  onAccion: (accion: string, item: any) => void;
  titulo?: string;
  emptyMessage?: string;

  url?: string;

}
// ... imports y definición de interfaz ListProps sin cambios

const List: React.FC<ListProps> = ({
  datos,
  columnas,
  acciones,
  onAccion,
  url,
  titulo = "Menú Disponible",
  emptyMessage = "No hay platillos disponibles",
}) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<{ index: number, action: string } | null>(null);
  const navigate = useNavigate();

  const headerGradient = "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400";
  const proceso = "Crear";

  return (
    <div className="rounded-xl bg-white shadow-xl overflow-hidden border-0 relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400"></div>

      {/* Encabezado */}
      <div className={`px-6 py-4 ${headerGradient}`}>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg md:text-xl text-white tracking-wide">
            {titulo}
          </h3>
          {url && (
            <button
              onClick={() => navigate(url, { state: { proceso } })}
              className="ml-4 bg-white text-red-600 rounded-full p-2 shadow-md hover:bg-red-100 transition"
              title="Agregar nuevo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Tabla: visible en pantallas md y superiores */}
      <div className="p-4 bg-gradient-to-b from-orange-50/80 to-white hidden md:block">
        <div className="overflow-x-auto rounded-xl shadow-sm">
          <table className="w-full text-sm border-separate border-spacing-0 bg-white rounded-xl">
            <thead>
              <tr className="bg-gradient-to-r from-amber-100/90 to-amber-50 text-amber-900 uppercase text-xs tracking-wider">
                {columnas.map((item) => (
                  <th key={item.text} className="px-6 py-4 font-semibold text-left">{item.text}</th>
                ))}
                {acciones.length > 0 && (
                  <th className="px-6 py-4 font-semibold text-center">ACCIONES</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100/50">
              {datos.length > 0 ? datos.map((item, index) => (
                <tr
                  key={index}
                  className={`transition-all duration-300 ${hoveredRow === index ? "bg-amber-50/70 shadow-sm" : "bg-white hover:bg-amber-50/30"}`}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {columnas.map((col) => (
                    <td key={col.text} className="px-6 py-4 whitespace-nowrap">
                      {col.type === "image" ? (
                        <div className="p-1 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full inline-block">
                          <img
                            src={item[col.name]}
                            alt="Platillo"
                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                          />
                        </div>
                      ) : col.type === "price" ? (
                        <div className="font-medium text-amber-800 bg-amber-50 px-4 py-1 rounded-full inline-block shadow-sm">
                          ${typeof item[col.name] === 'number' ? item[col.name].toFixed(2) : item[col.name]}
                        </div>
                      ) : col.type === "boolean" ? (
                        <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border border-amber-200/50 shadow-sm">
                          {item[col.name] ? "Sí" : "No"}
                        </span>
                      ) : col.type === "object" ? (
                        <span className="text-gray-800 font-medium">{item[col.name][col.attribute]}</span>
                      ) : col.type === "doubleObject" ? (
                        <span className="text-gray-800 font-medium">{item[col.name][col.attribute][col.secondAttribute]}</span>
                      ) : col.type === "photos" ? (
                        <button
                          onClick={() => navigate("/list-photo", { state: { id_issue: item.id } })}
                          className="text-red-600 text-sm underline hover:text-red-800 transition"
                        >
                          Ver fotos
                        </button>
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
                              onMouseEnter={() => setActiveTooltip({ index, action: accion.nombre })}
                              onMouseLeave={() => setActiveTooltip(null)}
                              className={`text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-200 transform hover:scale-110 hover:shadow-lg active:scale-95 ${
                                accion.nombre.toLowerCase().includes('delete')
                                  ? 'bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700'
                                  : accion.nombre.toLowerCase().includes('edit')
                                  ? 'bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700'
                                  : accion.nombre.toLowerCase().includes('view')
                                  ? 'bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700'
                                  : 'bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700'
                              }`}
                            >
                              <accion.icon size={18} className="drop-shadow-sm" />
                            </button>
                            {activeTooltip?.index === index && activeTooltip?.action === accion.nombre && (
                              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-700 to-amber-800 text-white text-xs px-3 py-1.5 rounded-lg z-10 shadow-lg animate-fadeIn">
                                {accion.etiqueta}
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-800 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              )) : (
                <tr>
                  <td colSpan={columnas.length + (acciones.length > 0 ? 1 : 0)} className="text-center py-10">
                    <p className="text-amber-700">{emptyMessage}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tarjetas responsivas para móviles */}
      <div className="p-4 space-y-6 block md:hidden">
        {datos.length > 0 ? datos.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-4 border border-orange-100">
            <h4 className="text-base font-semibold mb-2 truncate">{item.name || `Item ${index + 1}`}</h4>
            <div className="space-y-2 text-sm">
              {columnas.map((col) => (
                <div key={col.text} className="flex justify-between items-center">
                  <span className="font-medium text-orange-600">{col.text}:</span>
                  <span className="text-gray-700 text-right ml-2">
                    {col.type === "image" ? (
                      <img src={item[col.name]} alt={col.text} className="w-10 h-10 rounded-full object-cover" />
                    ) : col.type === "price" ? (
                      `$${typeof item[col.name] === 'number' ? item[col.name].toFixed(2) : item[col.name]}`
                    ) : col.type === "boolean" ? (
                      item[col.name] ? "Sí" : "No"
                    ) : col.type === "object" ? (
                      item[col.name][col.attribute]
                    ) : col.type === "doubleObject" ? (
                      item[col.name][col.attribute][col.secondAttribute]
                    ) : col.type === "photos" ? (
                      <button
                        onClick={() => navigate("/list-photo", { state: { id_issue: item.id } })}
                        className="text-red-600 text-sm underline hover:text-red-800 transition"
                      >
                        Ver fotos
                      </button>
                    ) : (
                      item[col.name]
                    )}
                  </span>
                </div>
              ))}
            </div>

            {acciones.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 justify-end">
                {acciones.map((accion) => (
                  <button
                    key={accion.nombre}
                    onClick={() => onAccion(accion.nombre, item)}
                    className={`text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-200 transform hover:scale-110 ${
                      accion.nombre.toLowerCase().includes('delete')
                        ? 'bg-red-500'
                        : accion.nombre.toLowerCase().includes('edit')
                        ? 'bg-amber-500'
                        : accion.nombre.toLowerCase().includes('view')
                        ? 'bg-green-500'
                        : 'bg-orange-500'
                    }`}
                  >
                    <accion.icon size={14} />
                  </button>
                ))}
              </div>
            )}
          </div>
        )) : (
          <div className="text-center text-amber-800 bg-amber-50/70 rounded-xl p-6">
            <p className="font-medium">{emptyMessage}</p>
            <p className="text-amber-600 text-sm mt-1">Intenta agregar nuevos elementos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
