import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NoPermission from './pages/NoPermission';
import Chart from './pages/Chart';

function App() {
  const isAuthenticated = true;
  const role = 'admin'

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/chart" element={isAuthenticated && role === "admin" ? (
          <Chart />
        ) : (
          <NoPermission />
        )} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="*" element={<NoPermission />} />
      </Routes>
    </div>
  );
}

export default App;
