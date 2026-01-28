import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the auth token if it exists
api.interceptors.request.use(
    (config) => {
        // Check if it's an admin API call
        const isAdminCall = config.url.includes('/auth/') ||
            config.url.includes('/events/') ||
            config.url.includes('/core/interest/') ||
            config.url.includes('/core/inquiry/') ||
            config.url.includes('/core/subscribers/') ||
            config.url.includes('/core/community-events/');

        // Use adminToken for admin calls, regular token for user calls
        const token = isAdminCall
            ? localStorage.getItem('adminToken')
            : localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
