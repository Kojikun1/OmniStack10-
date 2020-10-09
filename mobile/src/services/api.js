import axios from 'axios';
import api_url from '../../data_env';

const api = axios.create({
    baseURL: api_url
});

export default api;