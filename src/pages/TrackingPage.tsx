// pages/TrackingPage.tsx
import React, { useState } from "react";
import TrackingMap from "../components/TrackingMap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const TrackingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtenemos la placa desde location.state
  const plate = location.state?.plate;

  const [trackingActive, setTrackingActive] = useState(false);

  if (!plate) {
    // Si no hay placa, redirigir o mostr ar mensaje
    return (
      <div className="p-4">
        <p>No se ha especificado una placa para el seguimiento.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Volver
        </button>
      </div>
    );
  }

  const iniciarSeguimiento = async () => {
    try {
      await axios.post(`http://127.0.0.1:5000/motorcycles/track/${plate}`);
      setTrackingActive(true);
    } catch (error) {
      console.error("Error al iniciar seguimiento:", error);
    }
  };

  const pararSeguimiento = async () => {
    try {
      await axios.post(`http://127.0.0.1:5000/motorcycles/stop/${plate}`);
      setTrackingActive(false);
    } catch (error) {
      console.error("Error al detener seguimiento:", error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Seguimiento en tiempo real</h1>
      <p className="mb-4">Placa a seguir: <strong>{plate}</strong></p>

      <div className="mb-4">
        <button
          onClick={iniciarSeguimiento}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Iniciar seguimiento
        </button>
        <button
          onClick={pararSeguimiento}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Detener seguimiento
        </button>
      </div>

      {trackingActive && <TrackingMap plate={plate} />}
    </div>
  );
};

export default TrackingPage;
