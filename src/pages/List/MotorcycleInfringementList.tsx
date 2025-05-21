import React, { useEffect, useState } from 'react';
import { infractionService, Infraccion } from '../../services/infractionService';
import { FaExclamationCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MotorcycleInfringementList = () => {
  const [infracciones, setInfracciones] = useState<Infraccion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInfracciones();
  }, []);

  const loadInfracciones = async () => {
    try {
      const data = await infractionService.getAll();
      setInfracciones(data);
    } catch (error) {
      console.error('Error al cargar las infracciones:', error);
      toast.error('Error al cargar las infracciones');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta infracción?')) {
      try {
        await infractionService.delete(id);
        toast.success('Infracción eliminada exitosamente');
        loadInfracciones();
      } catch (error) {
        console.error('Error al eliminar la infracción:', error);
        toast.error('Error al eliminar la infracción');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTipo = (tipo: string) => {
    const tipos: { [key: string]: string } = {
      'EXCESO_VELOCIDAD': 'Exceso de Velocidad',
      'SEMAFORO_ROJO': 'Semáforo en Rojo',
      'ESTACIONAMIENTO': 'Estacionamiento Prohibido',
      'OTRO': 'Otro'
    };
    return tipos[tipo] || tipo;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default sm:px-7.5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FaExclamationCircle className="text-orange-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">
                Lista de Infracciones
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Placa</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tipo</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Fecha</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Monto</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Descripción</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {infracciones.map((infraccion) => (
                  <tr key={infraccion.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">{infraccion.placa}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{formatTipo(infraccion.tipo)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{formatDate(infraccion.fecha)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">S/. {infraccion.monto.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{infraccion.descripcion}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <button
                        onClick={() => handleDelete(infraccion.id!)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotorcycleInfringementList;
