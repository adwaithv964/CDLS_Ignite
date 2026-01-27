import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import api from '../../api/axios';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/auth/login/', { email, password });
            const token = response.data.key;
            localStorage.setItem('token', token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Login failed. Ensure you have admin privileges.');
            console.error(err);
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
                    {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded transition-colors"
                    >
                        Access Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
