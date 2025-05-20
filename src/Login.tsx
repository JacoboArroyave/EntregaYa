import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './styles/Login.css';
import { store } from './store/store';
import { setUser } from './store/UserSlice';
import { getRestaurants } from './services/restaurantService';
import { createCustomer, deleteCustomer, getCustomerByEmail } from './services/customerServices';
import { Customer } from './models/Customer';
import { setCustomer } from './store/CustomerSlice';
const Login = () => {
  
  const [error, setError] = useState<string | null>(null);

  // Correos permitidos
  const allowedEmails = ['camiloreact12@gmail.com', 'andresfelipegiraldorojas485@gmail.com', 'jacobo.arroyave46095@ucaldas.edu.co'];

  useEffect(() => {
    let decoded:any = localStorage.getItem('user');
    decoded =JSON.parse(decoded || '{}');
    
    if (decoded) {
      try {

        if (allowedEmails.includes(decoded.email)) {
          
          console.log('Usuario recuperado:', decoded);
        } else {
          console.warn('Correo no autorizado:', decoded.email);
          // Limpiar localStorage si el correo no está autorizado
          localStorage.removeItem('user');
          localStorage.removeItem('customer');
          localStorage.removeItem('google_token');
        }
      } catch (err) {
        console.error('Error al decodificar el token', err);
          localStorage.removeItem('user');

        // Limpiar localStorage si hay error
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
          let customer:any = await getCustomerByEmail(decoded.email);
          if (!customer) {
             customer = await createCustomer({
              email: decoded.email,
              name: decoded.name,
              phone: "123",
            });
            customer = customer[0];
          }
          store.dispatch(setCustomer(customer));
          localStorage.setItem('google_token', credential);
          // localStorage.setItem('user', JSON.stringify(decoded));
          store.dispatch(setUser(decoded));
        } else {
          setError('Este correo no está autorizado para ingresar.');
          localStorage.removeItem('user');
          localStorage.removeItem('customer');
          localStorage.removeItem('google_token');
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