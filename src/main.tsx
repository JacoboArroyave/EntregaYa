// main.tsx
// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './Login'; // ← Importas el componente
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="957915397315-dueel5t7jeftjic74rdn1kaggn03k71f.apps.googleusercontent.com">
    <Login />
    <App />

  </GoogleOAuthProvider>
);
