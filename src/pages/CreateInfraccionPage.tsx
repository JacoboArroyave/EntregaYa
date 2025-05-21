import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';
import { infractionService, Infraccion } from '../services/infractionService';
import { toast } from 'react-toastify';

const CreateInfraccionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Infraccion>({
    placa: '',
    tipo: '',
    descripcion: '',
    fecha: new Date().toISOString().split('T')[0],
    monto: 0
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'monto' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await infractionService.create(formData);
      toast.success('Infracción creada exitosamente');
      navigate('/list-motorcycle-infringement');
    } catch (error) {
      console.error('Error al crear la infracción:', error);
      toast.error('Error al crear la infracción');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default sm:px-7.5">
          <div className="flex items-center gap-2 mb-6">
            <FaExclamationCircle className="text-orange-600 text-2xl" />
            <h2 className="text-2xl font-bold text-gray-900">
              Crear Nueva Infracción
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Placa de la Motocicleta
                </label>
                <input
                  type="text"
                  name="placa"
                  value={formData.placa}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-700 outline-none transition focus:border-orange-600 active:border-orange-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Infracción
                </label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-700 outline-none transition focus:border-orange-600 active:border-orange-600"
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="EXCESO_VELOCIDAD">Exceso de Velocidad</option>
                  <option value="SEMAFORO_ROJO">Semáforo en Rojo</option>
                  <option value="ESTACIONAMIENTO">Estacionamiento Prohibido</option>
                  <option value="OTRO">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-700 outline-none transition focus:border-orange-600 active:border-orange-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monto (S/.)
                </label>
                <input
                  type="number"
                  name="monto"
                  value={formData.monto}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-700 outline-none transition focus:border-orange-600 active:border-orange-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-700 outline-none transition focus:border-orange-600 active:border-orange-600"
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/list-motorcycle-infringement')}
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-orange-600 px-6 py-3 font-medium text-white hover:bg-orange-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Creando...' : 'Crear Infracción'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateInfraccionPage; 