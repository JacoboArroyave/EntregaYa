// main.tsx
// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <GoogleOAuthProvider clientId="957915397315-dueel5t7jeftjic74rdn1kaggn03k71f.apps.googleusercontent.com">
  //  <Login />
  //    <App />

  //  </GoogleOAuthProvider>

    <GoogleOAuthProvider clientId="957915397315-dueel5t7jeftjic74rdn1kaggn03k71f.apps.googleusercontent.com">
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </GoogleOAuthProvider >


);




