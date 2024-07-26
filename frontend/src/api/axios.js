import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://web-app-backend-nu.vercel.app', 
  // baseURL: 'http://localhost:8083', 
});

export default instance;
