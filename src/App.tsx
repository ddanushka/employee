import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NoPermission from './pages/NoPermission';
import Chart from './pages/Chart';
import BaseLayout from './layout/Base';

function App() {
  const isAuthenticated = false;
  const role = 'admin'

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={isAuthenticated ? <BaseLayout /> : <Navigate to="/login" />}>
          <Route index element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/chart" element={isAuthenticated && role === "admin" ? (
            <Chart />
          ) : (
            <NoPermission />
          )} />
          <Route path="*" element={<NoPermission />} />
        </Route>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
