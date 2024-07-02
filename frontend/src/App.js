import './App.css';
import { Routes, Route } from'react-router-dom';
import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </>
  );
}

export default App;
