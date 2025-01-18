import axios from 'axios';

// Configuração do axios com a baseURL
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Base URL da API
});

export default api;
