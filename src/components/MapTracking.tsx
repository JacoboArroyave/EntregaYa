import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { io } from "socket.io-client";

const BASE_URL = "http://127.0.0.1:8000"; // URL backend SocketIO y API
const PLATE = "ABC124"; // placa que quieres rastrear

const MapaTracking = () => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const socketRef = useRef<any>(null);

  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    // Inicializar mapa solo una vez
    mapRef.current = L.map("map").setView([4.710989, -74.07209], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapRef.current);

    // Conectar socket
    socketRef.current = io(BASE_URL);

    // Escuchar coordenadas desde backend
    socketRef.current.on(PLATE, (data: any) => {
      const lat = data.lat || data.latitude;
      const lng = data.lng || data.longitude;
      if (!lat || !lng) return;

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else if (mapRef.current) {
        markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
      }

      mapRef.current?.setView([lat, lng]);
    });

    // Limpiar socket al desmontar componente
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const iniciarTracking = async () => {
    try {
      const res = await fetch(`${BASE_URL}/motorcycles/track/${PLATE}`, {
        method: "POST",
      });
      const json = await res.json();
      console.log(json);
      if (res.ok) setTracking(true);
    } catch (error) {
      console.error("Error al iniciar tracking:", error);
    }
  };

  const detenerTracking = async () => {
    try {
      const res = await fetch(`${BASE_URL}/motorcycles/stop/${PLATE}`, {
        method: "POST",
      });
      const json = await res.json();
      console.log(json);
      if (res.ok) setTracking(false);
    } catch (error) {
      console.error("Error al detener tracking:", error);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div id="map" style={{ height: "90%" }}></div>
      <div style={{ padding: "10px", textAlign: "center" }}>
        <button onClick={iniciarTracking} disabled={tracking}>
          Iniciar Tracking
        </button>
        <button onClick={detenerTracking} disabled={!tracking} style={{ marginLeft: 10 }}>
          Detener Tracking
        </button>
      </div>
    </div>
  );
};

export default MapaTracking;
