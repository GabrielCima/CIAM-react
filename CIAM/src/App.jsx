import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import authService from './services/authService';
import './styles/main.scss';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const authenticated = authService.isAuthenticated();
    setIsAuthenticated(authenticated);
  };

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    // Puedes redirigir a dashboard o página principal
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main">
        {!isAuthenticated ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div className="container">
            <div className="dashboard">
              <h1>Bienvenido al Sistema</h1>
              <p>Has iniciado sesión correctamente.</p>
              {/* Aquí irían los módulos/secciones de la API */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;