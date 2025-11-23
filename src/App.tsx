import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Onboarding/Login';
import Signup from './Pages/Onboarding/Signup';
import MainPage from './Pages/Home/MainPage';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/"
            element={
              <PublicRoute><Login /></PublicRoute>
            }
          />
          <Route path="/signup"
            element={
              <PublicRoute><Signup /></PublicRoute>
            }
          />
          <Route path="/home"
            element={
              <ProtectedRoute><Home/></ProtectedRoute>
            }
          />
          <Route path="/main"
            element={
              <PublicRoute><MainPage/></PublicRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
