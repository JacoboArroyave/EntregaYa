// App.tsx

// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './styles/App.css';
import DriverList from "./pages/DriverList";
import MotorcycleList from "./pages/MotorcycleList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import RestaurantList from './pages/RestaurantList';
import MenuList from './pages/MenuList';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Router>

      <div>
        <DriverList />
      </div>
      <div>
        <MotorcycleList />
      </div>
      <div>
        <ProductList />
      </div>
      <div>
        <RestaurantList />
      </div>
      <div>
        <MenuList />
      </div>
      {/* Ejemplo con boton */}
      {/* <div>
        <Link to="/drivers">
          <button>Ir a la lista de drivers</button>
        </Link>
      </div>

      <Routes>
        <Route path="/drivers" element={<DriverList />} />
      </Routes> */}
    </Router>
  );
}

export default App;