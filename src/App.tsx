import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Onboarding/Login';
import Signup from './Pages/Onboarding/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
