import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store'; // ⚠️ ajusta esta ruta a tu archivo real

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId="957915397315-dueel5t7jeftjic74rdn1kaggn03k71f.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}> {/* 👈 Aquí agregas el Provider */}
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
