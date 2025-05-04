import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './styles/Login.css';

const Login = () => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Correos permitidos
  const allowedEmails = ['camiloreact12@gmail.com', 'andres.giraldo47424.@ucaldas.edu.co'];

  useEffect(() => {
    const savedToken = localStorage.getItem('google_token');
    if (savedToken) {
      try {
        const decoded = jwtDecode<any>(savedToken);

        if (allowedEmails.includes(decoded.email)) {
          setToken(savedToken);
          setUser(decoded);
          console.log('Token recuperado:', savedToken);
          console.log('Usuario recuperado:', decoded);
        } else {
          console.warn('Correo no autorizado:', decoded.email);
          handleLogout();
        }
      } catch (err) {
        console.error('Error al decodificar el token', err);
        handleLogout();
      }
    }
  }, []);

  const handleLoginSuccess = (credentialResponse: any) => {
    const credential = credentialResponse.credential;

    if (credential) {
      try {
        const decoded = jwtDecode<any>(credential);

        if (allowedEmails.includes(decoded.email)) {
          localStorage.setItem('google_token', credential);
          setToken(credential);
          setUser(decoded);
          setError(null);
        } else {
          setError('Este correo no está autorizado para ingresar.');
          localStorage.removeItem('google_token');
          setUser(null);
          setToken(null);
        }
      } catch (err) {
        setError('Error al procesar la información de inicio de sesión');
        console.error(err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('google_token');
    setUser(null);
    setToken(null);
  };

  const getDisplayToken = () => {
    if (!token) return '';
    return token.length > 40 ? `${token.substring(0, 20)}...${token.substring(token.length - 20)}` : token;
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Iniciar sesión con Google</h1>

      {!user ? (
        <div className="google-btn-container">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              setError('No se pudo completar el inicio de sesión');
              console.log('Login fallido');
            }}
          />
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <div className="user-profile">
          <h2>Bienvenido, {user.name}</h2>
          <img src={user.picture} alt="Foto de perfil" />
          <p>Correo: {user.email}</p>

          <div className="token-field">
            <strong>Token:</strong>
            <div className="token-value">
              {getDisplayToken()}
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
