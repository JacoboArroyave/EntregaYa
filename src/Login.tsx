import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './styles/Login.css';
import { store } from './store/store';
import { setUser } from './store/UserSlice';
import { getRestaurants } from './services/restaurantService';
const Login = () => {
  
  const [error, setError] = useState<string | null>(null);

  // Correos permitidos
  const allowedEmails = ['camiloreact12@gmail.com', 'andres.giraldo47424.@ucaldas.edu.co', 'jacobo.arroyave46095@ucaldas.edu.co'];

  useEffect(() => {
    const savedToken = localStorage.getItem('google_token');
    if (savedToken) {
      try {
        const decoded = jwtDecode<any>(savedToken);

        if (allowedEmails.includes(decoded.email)) {
          
          console.log('Usuario recuperado:', decoded);
        } else {
          console.warn('Correo no autorizado:', decoded.email);
          // Limpiar localStorage si el correo no está autorizado
          localStorage.removeItem('user');
        }
      } catch (err) {
        console.error('Error al decodificar el token', err);
        // Limpiar localStorage si hay error
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLoginSuccess = async (credentialResponse: any) => {
    const credential = credentialResponse.credential;

    if (credential) {
      try {
        const decoded = jwtDecode<any>(credential);
        
        if (allowedEmails.includes(decoded.email)) {
          const response=await getRestaurants()
          console.log(response);
          
          store.dispatch(setUser(decoded))
        } else {
          setError('Este correo no está autorizado para ingresar.');
          localStorage.removeItem('user');
        }
      } catch (err) {
        setError('Error al procesar la información de inicio de sesión');
        console.error('Error decodificando token:', err);
      }
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Iniciar sesión con Google</h1>

      <div className="google-btn-container">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            setError('No se pudo completar el inicio de sesión');
            console.log('Login fallido');
          }}
          useOneTap
        />
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;