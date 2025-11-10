import axios from 'axios';

const API_BASE_URL = 'http://10.164.129.77/app/api/cuenta/v1/Autentica';

const authService = {
  login: async (usuario, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        usuario,
        password
      });
      
      // Guardar token
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.usuario));
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error de conexión');
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  },

  getToken: () => {
    return localStorage.getItem('authToken');
  },

  getUserData: () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

export default authService;