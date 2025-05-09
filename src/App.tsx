// App.tsx

// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './styles/App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes/index';
import Login from './Login';
import ProtectedRoute from './Auth/ProtectedRoute';
import { Suspense } from 'react';
import Loader from './common/Loader';
import { GoogleOAuthProvider } from '@react-oauth/google';
import DriverList from './pages/DriverList';

function App() {
  // const [count, setCount] = useState(0);


  return (

    <Routes>

      <Route path="/login" element={<Login />} />

      
      <Route element={<ProtectedRoute />}>
        {routes.map((routes, index) => {
          const { path, component: Component } = routes;
          return (
            <Route
              key={index}
              path={path}
              element={
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
              }
            />
          );
        })}
      </Route>
    </Routes>

  );
}

export default App;