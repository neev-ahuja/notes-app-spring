import axios from 'axios';
import Cookies from 'js-cookie';

const client = axios.create({
    baseURL: 'https://notesapp-51sc.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use(
    (config) => {
        const token = Cookies.get('jwt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default client;
