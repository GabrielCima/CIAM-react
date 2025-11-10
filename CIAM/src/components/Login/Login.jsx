import React, { useState } from 'react';
import authService from '../../services/authService';
import './Login.scss';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.login(formData.usuario, formData.password);
      onLoginSuccess?.(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="login__card">
          <h2 className="login__title">Iniciar Sesión</h2>
          
          <form className="login__form" onSubmit={handleSubmit}>
            {error && (
              <div className="login__error">
                {error}
              </div>
            )}
            
            <div className="login__field">
              <label htmlFor="usuario" className="login__label">
                Usuario
              </label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                className="login__input"
                required
                disabled={loading}
              />
            </div>
            
            <div className="login__field">
              <label htmlFor="password" className="login__label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="login__input"
                required
                disabled={loading}
              />
            </div>
            
            <button 
              type="submit" 
              className="login__button"
              disabled={loading}
            >
              {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;