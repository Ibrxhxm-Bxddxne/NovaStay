import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // L'adresse de ton Laravel
    withCredentials: true, // Requis pour que Sanctum gère les cookies/sessions
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    }
});

export default api;