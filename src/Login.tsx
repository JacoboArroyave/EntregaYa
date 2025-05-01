import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  // Al cargar la página, intenta recuperar el token
  useEffect(() => {
    const savedToken = localStorage.getItem('google_token');
    if (savedToken) {
      setToken(savedToken);
      const decoded = jwtDecode(savedToken);
      setUser(decoded);
    }
  }, []);

  // Maneja el inicio de sesión exitoso
  const handleLoginSuccess = (credentialResponse: any) => {
    const credential = credentialResponse.credential;

    if (credential) {
      localStorage.setItem('google_token', credential);
      setToken(credential);
      const decoded = jwtDecode(credential);
      setUser(decoded);
    }
  };

  // Maneja el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('google_token'); // Elimina el token del almacenamiento local
    setUser(null); // Limpia el estado del usuario
    setToken(null); // Limpia el token
  };

  return (
    <div>
      <h1>Login con Google</h1>

      {!user ? (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log('Login fallido');
          }}
        />
      ) : (
        <div>
          <h2>Bienvenido, {user.name}</h2>
          <img src={user.picture} alt="Foto de perfil" />
          <p>Correo: {user.email}</p>
          <p><strong>Token:</strong> {token}</p>
          <button onClick={handleLogout}>Cerrar sesión</button> {/* Botón de logout */}
        </div>
      )}
    </div>
  );
};

export default Login;
