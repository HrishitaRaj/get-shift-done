import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/landing';
import Home from './pages/Home'; 
import Scheduling from './pages/scheduling'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Scheduling" element={<Scheduling />} />
      </Routes>
    </Router>
  );
}

export default App;
