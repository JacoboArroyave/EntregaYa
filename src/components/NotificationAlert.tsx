import { useEffect } from "react";

interface Props {
  message: string;
  onClose: () => void;
}

const NotificationAlert = ({ message, onClose }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Oculta luego de 3 segundos
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="flex items-start gap-4 bg-red-600 text-white rounded-xl shadow-lg p-4 animate-slide-in w-80 border-2 border-red-400">
        <div className="text-2xl">🚨</div>
        <div className="flex-1">
          <p className="font-bold text-lg">¡Nuevo Pedido!</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationAlert;
