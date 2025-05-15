import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Bell, Menu, X, ShoppingBag, MapPin, Truck } from "lucide-react";

// Conexión al socket
const socket = io("http://127.0.0.1:5000");

const Navbar = () => {
  const [notifications, setNotifications] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Seleccionar ubicación");
  
  const navItems = [
    { name: "Restaurantes", href: "/restaurantes" },
  ];

  useEffect(() => {
    socket.on("new_notification", (data) => {
      console.log("Nueva notificación:", JSON.stringify(data));
      setNotifications((prev) => prev + 1);
    });

    return () => {
      socket.off("new_notification");
    };
  }, []);

  const clearNotifications = () => {
    setNotifications(0);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-red-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre de la app */}
          <div className="flex items-center">
            <Truck className="h-7 w-7 text-white mr-1" />
            <span className="text-white text-lg font-bold">DeliveryYa</span>
          </div>
          
          {/* Ubicación (escritorio) */}
          <div className="hidden md:flex items-center mx-4 flex-1">
            <div className="flex items-center text-white bg-red-600 px-3 py-1 rounded-full max-w-xs">
              <MapPin size={16} className="mr-1 flex-shrink-0" />
              <span className="text-sm truncate">{currentLocation}</span>
            </div>
          </div>
          
          {/* Enlaces de navegación (escritorio) */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          
          {/* Iconos de carrito y notificaciones */}
          <div className="flex items-center">
            {/* Carrito */}
            <a href="/carrito" className="p-2 text-white relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-700 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                3
              </span>
            </a>
            
            {/* Notificaciones */}
            <div className="relative mx-2">
              <button
                onClick={clearNotifications}
                className="p-2 text-white relative"
                aria-label="Ver notificaciones"
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-700 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {notifications > 9 ? '9+' : notifications}
                  </span>
                )}
              </button>
            </div>
            
            {/* Botón de menú móvil */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-white"
                aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-red-600">
          {/* Ubicación móvil */}
          <div className="px-4 py-2 flex items-center text-white border-b border-red-400">
            <MapPin size={16} className="mr-2" />
            <span className="text-sm truncate">{currentLocation}</span>
          </div>
          
          {/* Navegación móvil */}
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white block px-3 py-2 rounded-md text-base"
              >
                {item.name}
              </a>
            ))}
            <a href="/carrito" className="flex items-center text-white px-3 py-2 rounded-md text-base">
              <ShoppingBag size={16} className="mr-2" />
              Mi Carrito (3)
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;