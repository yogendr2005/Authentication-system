// import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from "./components/Home";
import ForegetPass from "./components/ForegetPass";
import ResetPass from "./components/ResetPass";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/forgetpass" element={<ForegetPass/>}/>
         <Route path="/resetpass" element={<ResetPass/>}/>
      </Routes>
    </Router>
  );
}

export default App;
