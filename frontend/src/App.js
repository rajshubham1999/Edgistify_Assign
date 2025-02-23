import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import Order from './components/Order/Order';
import OrderStatus from './components/OrderStatus/OrderStatus';

function App() {
  return (
    <Router>
      <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/cart/:userId" element={<Cart />} />
        <Route path="/order/:userId" element={<ProtectedRoute element={<Order />} />} /> 
        <Route path="/orderstatus/:userId" element={<OrderStatus/>}/>
      </Routes>
      </div>
    </Router>
    // <div>
    //   <Dashboard/>
    // </div>
  );
}

export default App;
