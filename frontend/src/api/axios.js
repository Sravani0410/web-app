import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://web-app-backend-nu.vercel.app', 
});

export default instance;
