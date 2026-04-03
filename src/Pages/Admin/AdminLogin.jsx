import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Loader2, WifiOff } from 'lucide-react';
import api from '../../api/axios';

const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

// Max seconds we wait for a cold-start backend to wake up
const WARMUP_TIMEOUT_S = 70;

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [warmingUp, setWarmingUp] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const navigate = useNavigate();
    const timerRef = useRef(null);

    // Clean up timer on unmount
    useEffect(() => () => clearInterval(timerRef.current), []);

    const startElapsedTimer = () => {
        setElapsed(0);
        timerRef.current = setInterval(() => {
            setElapsed(prev => prev + 1);
        }, 1000);
    };

    const stopElapsedTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setWarmingUp(false);

        // On production Render, detect cold start by delaying "waking up" banner
        let warmupBannerTimer;
        if (!isLocalhost) {
            warmupBannerTimer = setTimeout(() => {
                setWarmingUp(true);
                startElapsedTimer();
            }, 3000); // Show banner only if request takes > 3s
        }

        try {
            const response = await api.post('/auth/login/', { email, password });
            clearTimeout(warmupBannerTimer);
            stopElapsedTimer();
            const token = response.data.key;
            localStorage.setItem('adminToken', token);
            navigate('/admin/dashboard');
        } catch (err) {
            clearTimeout(warmupBannerTimer);
            stopElapsedTimer();
            setWarmingUp(false);

            const isTimeout = err.code === 'ECONNABORTED' || err.message?.includes('timeout');
            if (isTimeout) {
                setError(
                    'The server took too long to respond. It may have been sleeping — please try again in a moment.'
                );
            } else if (err.response?.status === 403 || err.response?.status === 401) {
                setError('Login failed. Ensure you have admin privileges.');
            } else {
                setError('Login failed. Ensure you have admin privileges.');
            }
            console.error(err);
        } finally {
            setLoading(false);
            setWarmingUp(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-slate-800 p-6 flex flex-col items-center">
                    <ShieldCheck className="text-teal-400 w-12 h-12 mb-2" />
                    <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
                </div>

                <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded">
                            <WifiOff className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {warmingUp && !error && (
                        <div className="flex items-center gap-3 text-amber-700 text-sm bg-amber-50 border border-amber-200 p-3 rounded">
                            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                            <span>
                                Waking up the server… this can take up to {WARMUP_TIMEOUT_S}s on first load.
                                <span className="font-mono ml-1">({elapsed}s)</span>
                            </span>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            id="admin-email"
                            autoComplete="username"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onInvalid={(e) => e.target.setCustomValidity('Invalid email, Enter a valid email')}
                            onInput={(e) => e.target.setCustomValidity('')}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="admin-password"
                            autoComplete="current-password"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        id="admin-login-btn"
                        disabled={loading}
                        className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {warmingUp ? 'Waiting for server…' : 'Signing in…'}
                            </>
                        ) : (
                            'Access Dashboard'
                        )}
                    </button>
                </form>
            </div>

            {!isLocalhost && (
                <p className="mt-4 text-slate-500 text-xs text-center max-w-xs">
                    Running on free hosting — first login after inactivity may take up to a minute.
                </p>
            )}
        </div>
    );
};

export default AdminLogin;

