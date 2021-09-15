import axios from 'axios';

const token = sessionStorage.getItem('token');

const axiosApi = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosApi;
