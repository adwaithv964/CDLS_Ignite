import React, { useState } from 'react';
import { X, User, Mail, Phone } from 'lucide-react';
import api from '../../../api/axios';

const RegisterEventModal = ({ event, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        event: event.id
    });
    const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');
        try {
            await api.post('/events/register/', formData);
            setStatus('success');
            setTimeout(() => {
                onSuccess();
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Error registering:', error);
            setStatus('error');
            setErrorMsg('Failed to register. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative">

                {/* Header */}
                <div className="bg-[#1B2A41] p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 z-10">
                        <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    <h2 className="text-2xl font-bold mb-1">Register Now</h2>
                    <p className="text-white/70 text-sm">For {event.title}</p>

                    {/* Decorative abstract circle */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#8B5CF6] rounded-full opacity-20 blur-xl"></div>
                </div>

                <div className="p-8">
                    {status === 'success' ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
                            <p className="text-gray-500">You have been registered for the event.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {status === 'error' && <div className="bg-red-50 text-red-500 p-3 rounded text-sm text-center">{errorMsg}</div>}

                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full bg-[#8B5CF6] hover:bg-[#7c4dff] text-white font-bold py-3 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
                            >
                                {status === 'sending' ? 'Registering...' : 'Confirm Registration'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterEventModal;
