import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Optionally update profile with name using updateProfile(auth.currentUser, { displayName: name })
            navigate('/'); // Redirect to home or dashboard after successful registration (auto-login usually)
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative">
            {/* Close button */}
            <Link to="/" className="absolute top-8 right-8 text-gray-400 hover:text-gray-600">
                <div className="bg-gray-200 rounded-md p-1">
                    <X size={20} className="text-white" />
                </div>
            </Link>

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-secondary text-xl font-medium mb-4">Create An Account</h2>
                    <h1 className="text-dark text-2xl font-serif mb-8">Welcome! Register for an account</h1>

                    <button className="w-full bg-white border border-gray-200 rounded-full py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors mb-8 group">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        <span className="text-dark font-medium">SignUp with Google</span>
                    </button>

                    <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        <div>
                            <label className="block text-dark text-lg mb-2 font-serif">Your Name</label>
                            <input
                                type="text"
                                className="w-full bg-gray-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-dark text-lg mb-2 font-serif">Email</label>
                            <input
                                type="email"
                                className="w-full bg-gray-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onInvalid={(e) => e.target.setCustomValidity('Invalid email, Enter a valid email')}
                                onInput={(e) => e.target.setCustomValidity('')}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-dark text-lg mb-2 font-serif">Password</label>
                            <input
                                type="password"
                                className="w-full bg-gray-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-dark text-lg mb-2 font-serif">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full bg-gray-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-40 mx-auto block bg-primary hover:bg-teal-500 text-white font-bold py-3 rounded-md transition-colors uppercase tracking-wider"
                        >
                            Register
                        </button>
                    </form>

                    <div className="mt-8 flex items-center justify-center gap-2">
                        <span className="text-gray-600 font-serif">Already a member?</span>
                        <Link to="/login" className="text-secondary font-bold flex items-center hover:underline">
                            SIGN IN <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
