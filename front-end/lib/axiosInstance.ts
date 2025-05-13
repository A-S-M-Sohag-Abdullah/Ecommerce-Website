import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // e.g., http://localhost:5000/api
  withCredentials: true, // for sending cookies with auth
});

export default axiosInstance;
