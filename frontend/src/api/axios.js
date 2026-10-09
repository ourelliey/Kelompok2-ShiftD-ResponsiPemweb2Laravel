import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://d2.athafa.cloud/api', // Mengarah ke API di server
    headers: {
      'Content-Type': 'application/json',
    },
  });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;