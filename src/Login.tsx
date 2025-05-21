import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './styles/Login.css';
import { store } from './store/store';
import { setUser } from './store/UserSlice';
import { createCustomer, getCustomerByEmail } from './services/customerServices';
import { setCustomer } from './store/CustomerSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const allowedEmails = [
    'camiloreact12@gmail.com',
    'andresfelipegiraldorojas485@gmail.com',
    'jacobo.arroyave46095@ucaldas.edu.co',
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        const decoded = JSON.parse(storedUser);

        if (decoded && decoded.email && allowedEmails.includes(decoded.email)) {
          console.log('Usuario recuperado:', decoded);
        } else {
          console.warn('Correo no autorizado o inválido:', decoded?.email);
          localStorage.removeItem('user');
          localStorage.removeItem('customer');
          localStorage.removeItem('google_token');
        }
      } catch (err) {
        console.error('Error al decodificar el usuario', err);
        localStorage.removeItem('user');
        localStorage.removeItem('customer');
        localStorage.removeItem('google_token');
      }
    }
  }, []);

  const handleLoginSuccess = async (credentialResponse: any) => {
    const credential = credentialResponse.credential;

    if (credential) {
      try {
        const decoded = jwtDecode<any>(credential);

        if (allowedEmails.includes(decoded.email)) {
          

          localStorage.setItem('google_token', credential);
          // localStorage.setItem('user', JSON.stringify(decoded));
          store.dispatch(setUser(decoded));

          // Guardar en localStorage
          localStorage.setItem('user', JSON.stringify(decoded));
          localStorage.setItem('google_token', credential);

          navigate("/");
        } else {
          setError('Este correo no está autorizado para ingresar.');
          localStorage.clear();
        }
      } catch (err) {
        setError('Error al procesar la información de inicio de sesión');
        console.error('Error decodificando token:', err);
        localStorage.clear();
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
