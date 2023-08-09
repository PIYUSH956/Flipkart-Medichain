import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import Dashboard from './component/Dashboard';
import Upload from './component/Upload';


function App() {
  return (
    <div className="App">

         
    
        <Routes>

          <Route path='login' element={<Register />} />
          <Route path='register' element={<Login />} />

          <Route path='dashboard' element={<Dashboard />} />
          <Route path='/upload' element={<Upload />} />

        </Routes>

    </div>
  );
}

export default App;
