// src/api/axios.ts
import axios from 'axios';
import { store } from '@/app/store'; // <-- Import the Redux store

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// This is the interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Get the token from our Redux state
        const token = store.getState().auth.token;

        if (token) {
            // If the token exists, add it to the Authorization header
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;