import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';
axios.interceptors.response.use(undefined, async function (error) {
  if (error.response?.status === 419) {
    await axios.get('sanctum/csrf-cookie');
    return axios.request(error.config);
  }
  throw error;
})


export default axios;