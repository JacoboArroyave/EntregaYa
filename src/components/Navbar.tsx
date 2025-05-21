import { useEffect, useState } from "react";
import io from "socket.io-client";
import LogoutButton from "./Logout";
import UserProfile from "./UserProfile";
import { Bell, Menu, X, ShoppingBag, MapPin, Truck } from "lucide-react";

// Conexión al socket
// const socket = io("http://127.0.0.1:8000");


const Navbar = ({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (open: boolean) => void }) => {
  const [notifications, setNotifications] = useState(0);
  const [currentLocation, setCurrentLocation] = useState("Seleccionar ubicación");
const [showDropdown, setShowDropdown] = useState(false);

  // const [currentLocation, setCurrentLocation] = useState("Seleccionar ubicación");

  const navItems = [{ name: "Restaurantes", href: "/restaurantes" }];

  // useEffect(() => {
  //   socket.on("new_notification", (data) => {
  //     console.log("Nueva notificación:", JSON.stringify(data));
  //     setNotifications((prev) => prev + 1);
  //   });

  //   return () => {
  //     socket.off("new_notification");
  //   };
  // }, []);

  // Función para limpiar notificaciones
  const clearNotifications = () => {
    setNotifications(0);
  };

  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-72 bg-orange-600 shadow-md z-40">
      <div className="px-4">
        <div className="flex items-center justify-between h-16">
          {/* Botón menú móvil */}
          <div className="lg:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-white"
              aria-label="Toggle menú"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Ubicación (escritorio) */}
          <div className="hidden md:flex items-center mx-4 flex-1">
            <div className="flex items-center text-white bg-orange-800 px-3 py-1 rounded-full max-w-xs">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm truncate">{currentLocation}</span>

            </div>
          </div>

          {/* Enlaces y notificaciones */}
          <div className="flex items-center space-x-2">
            <a href="/carrito" className="relative text-white p-2">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-orange-800 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">3</span>
            </a>

            <button
              onClick={clearNotifications}
              className="relative text-white p-2"
              aria-label="Ver notificaciones"
            >
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-orange-800 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {notifications > 9 ? "9+" : notifications}
                </span>
              )}
            </button>

             <div className="relative ml-2">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center focus:outline-none"
                >
                  <UserProfile />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20">
                    <div className="px-2 py-1">
                      <LogoutButton />
                    </div>
                  </div>
                )}
              </div>
          </div>
        </div>
      </div>

    </nav>
    // function setIsMobileMenuOpen(arg0: boolean) {
    //   throw new Error("Function not implemented.");
    // }
  );
};

export default Navbar;