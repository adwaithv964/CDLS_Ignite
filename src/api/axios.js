import axios from 'axios';

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const devBaseUrl = 'http://localhost:8000/api';
const prodBaseUrl = import.meta.env.VITE_API_URL;

// Render free tier can take 30-60 seconds for cold starts.
// Keep the timeout generous enough to survive a full wake-up cycle.
const TIMEOUT_MS = isLocalhost ? 10000 : 65000;

const api = axios.create({
    baseURL: isLocalhost ? devBaseUrl : prodBaseUrl,
    timeout: TIMEOUT_MS,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Proactively wake the Render backend.
 * Call this early (e.g. on app mount) so the server is warm by the time
 * the user hits Login. Silently ignores any errors.
 */
export async function pingBackend() {
    if (isLocalhost) return;
    try {
        await api.get('/core/maintenance/', { timeout: 65000 });
    } catch (_) { /* intentionally silent — just warming up */ }
}

// ── Request interceptor: attach auth token ────────────────────────────────────
api.interceptors.request.use(
    (config) => {
        // Check if it's an admin API call
        const isAdminCall = config.url.includes('/auth/') ||
            config.url.includes('/events/') ||
            config.url.includes('/members/') ||
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

// ── Response interceptor: auto-logout on invalid/expired token ────────────────
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        // If the server returns 401 or 403, the stored token is invalid
        if (status === 401 || status === 403) {
            const hadAdminToken = !!localStorage.getItem('adminToken');
            // Clear stale tokens
            localStorage.removeItem('adminToken');
            localStorage.removeItem('token');
            // Only redirect if we were on an admin page
            if (hadAdminToken && window.location.pathname.startsWith('/admin')) {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;

