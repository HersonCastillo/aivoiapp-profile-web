import axios from 'axios';

const token = sessionStorage.getItem('token');

const axiosApi = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosApi.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');

    window.location.href = '/linking?expired=true';
  }
  return error;
});

export default axiosApi;
