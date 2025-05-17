import { Navigate, Outlet } from "react-router-dom";

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
    
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;
    return user ? true : false;
};

// Componente de Ruta Protegida
const ProtectedRoute = () => {
    console.log(isAuthenticated());
    
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
