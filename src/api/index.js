// utils/axiosRootInstance.js
import axios from 'axios';

const axiosRootInstance = axios.create({
  baseURL: 'http://localhost:3000/v1',
  headers: {
    'Content-Type': 'application/json',
    'Bypass-Tunnel-Reminder':'yes'
  },
});

axiosRootInstance.interceptors.request.use(
  (config) => {
    if(config.headers.secured){
         config.headers.Authorization = JSON.parse(localStorage.getItem('token')).accessToken;
    }
    
    console.log(config.url, config.data, config.method)

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosRootInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosRootInstance;
