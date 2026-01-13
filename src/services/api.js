import axios from 'axios';
import { getToken } from '../utils/auth';


const API = axios.create({ baseURL: 'http://localhost:4000/api' });
API.interceptors.request.use(cfg => {
const token = getToken();
if(token) cfg.headers.Authorization = `Bearer ${token}`;
return cfg;
});
export default API;