import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_API_KEY,
  },
});

export default instance;
