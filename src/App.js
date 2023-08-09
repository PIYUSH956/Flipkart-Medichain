import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import Dashboard from './component/Dashboard';

function App() {
  return (
    <div className="App">

      <Routes>

    
         <Route path='login' element={<Register />} />
         <Route path='register' element={<Login />} />
         <Route path='dashboard' element={<Dashboard />} />

      </Routes>
      
    </div>
  );
}

export default App;
