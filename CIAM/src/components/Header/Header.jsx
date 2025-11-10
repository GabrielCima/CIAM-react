import React, { useState, useEffect } from 'react';
import authService from '../../services/authService';
import './Header.scss';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const authenticated = authService.isAuthenticated();
    setIsAuthenticated(authenticated);
    
    if (authenticated) {
      setUserData(authService.getUserData());
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUserData(null);
    setIsMobileMenuOpen(false);
    // Redirigir al login si es necesario
    window.location.href = '/login';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          
          {/* Logo */}
          <div className="header__logo">
            <h1 className="header__title">Sistema SIAM</h1>
          </div>

          {/* Navegación Desktop */}
          <nav className="header__nav header__nav--desktop">
            <ul className="header__menu">
              <li className="header__menu-item">
                <a href="/" className="header__menu-link">Inicio</a>
              </li>
              <li className="header__menu-item">
                <a href="/modulos" className="header__menu-link">Módulos</a>
              </li>
              <li className="header__menu-item">
                <a href="/reportes" className="header__menu-link">Reportes</a>
              </li>
            </ul>
          </nav>

          {/* User Info / Login */}
          <div className="header__user">
            {isAuthenticated ? (
              <div className="header__user-info">
                <span className="header__user-name">
                  {userData?.nombre || 'Usuario'}
                </span>
                <button 
                  className="header__logout-btn"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <a href="/login" className="header__login-btn">
                Iniciar Sesión
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="header__mobile-toggle"
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <nav className="header__nav header__nav--mobile">
          <ul className="header__menu">
            <li className="header__menu-item">
              <a href="/" className="header__menu-link">Inicio</a>
            </li>
            <li className="header__menu-item">
              <a href="/modulos" className="header__menu-link">Módulos</a>
            </li>
            <li className="header__menu-item">
              <a href="/reportes" className="header__menu-link">Reportes</a>
            </li>
            {isAuthenticated && (
              <li className="header__menu-item">
                <button 
                  className="header__logout-btn header__logout-btn--mobile"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;