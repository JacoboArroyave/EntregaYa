import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const TrackingMap: React.FC<{ plate: string }> = ({ plate }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Crear socket
    const newSocket = io("http://127.0.0.1:8000");

    // Guardar para limpiar luego
    setSocket(newSocket);

    // Al conectarse, unirse a la sala de la placa
    newSocket.on("connect", () => {
      console.log("🟢 Socket conectado", newSocket.id);
      newSocket.emit("join_room", { plate });
    });

    // Escuchar evento 'ubicacion'
    newSocket.on(plate, (data) => {
      console.log("📍 Coordenadas recibidas:", data);
      if (data.lat && data.lng) {
        setPosition([data.lat, data.lng]);
        console.log("🧭 Posición actualizada:", [data.lat, data.lng]);
      }
    });

    // Manejar desconexión
    newSocket.on("disconnect", () => {
      console.log("🔴 Socket desconectado");
    });

    // Limpiar al desmontar o cambiar placa
    return () => {
      newSocket.emit("leave_room", { plate });
      newSocket.disconnect();
    };
  }, [plate]);

  return (
    <div className="w-full h-[500px]">
      {position ? (
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker
            position={position}
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              iconSize: [32, 32],
            })}
          >
            <Popup>Ubicación actual de {plate}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p className="text-center mt-4">Esperando coordenadas...</p>
      )}
    </div>
  );
};

export default TrackingMap;
