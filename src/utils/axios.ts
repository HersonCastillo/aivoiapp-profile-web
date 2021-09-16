import axios from 'axios';

const axiosApi = axios.create();

axiosApi.interceptors.request.use((request) => ({
  ...request,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}));

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('role');

      window.location.href = '#/linking?expired=true';
    }
    return error;
  },
);

export default axiosApi;
