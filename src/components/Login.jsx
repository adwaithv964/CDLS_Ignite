import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, X } from 'lucide-react';

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
            <div className="w-full max-w-md relative">
                {/* Close Button */}
                <Link to="/" className="absolute -top-4 -right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <div className="bg-gray-200 hover:bg-gray-300 rounded-md p-1">
                        <X className="w-5 h-5 text-white" />
                    </div>
                </Link>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif text-gray-800 mb-4">Login</h1>
                    <p className="text-xl font-serif text-gray-800">Hi, Welcome back!</p>
                </div>

                {/* Google Login */}
                <button className="w-full flex items-center justify-center gap-3 bg-white border border-rose-100 rounded-full py-3 mb-8 hover:bg-gray-50 transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
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
                    <span className="text-gray-700 font-medium text-lg">Login with Google</span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-gray-300 font-serif text-lg">or Login with Email</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {/* Form */}
                <form className="space-y-6">
                    <div>
                        <label className="block text-xl font-serif text-gray-800 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="E.g. johndoe@email.com"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 text-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-xl font-serif text-gray-800 mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="E.g. johndoe@email.com" // Placeholder matches design even if unusual for password
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 text-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <div className="relative flex items-center">
                                <input type="checkbox" className="peer w-6 h-6 border-2 border-gray-300 rounded-sm checked:bg-primary checked:border-primary appearance-none transition-colors" />
                                <svg className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-1 top-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <span className="text-gray-800 font-serif font-medium">Remember Me</span>
                        </label>
                        <a href="#" className="text-secondary hover:text-orange-600 transition-colors font-medium">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-teal-600 text-white font-serif font-bold text-xl py-3 rounded-lg shadow-md transition-colors mt-8"
                    >
                        Login
                    </button>
                </form>

                {/* Footer Links */}
                <div className="text-center mt-6 flex items-center justify-center gap-2">
                    <span className="text-gray-600 text-lg font-serif">Not registered yet?</span>
                    <Link to="/register" className="text-secondary hover:text-orange-600 font-medium text-lg flex items-center gap-1">
                        Create an account <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {/* Bottom Terms */}
                <div className="text-center mt-12 mb-4 text-sm text-gray-800">
                    By clicking on 'Login' you agree to the{' '}
                    <a href="#" className="underline hover:text-gray-600">Terms of Service</a>
                    {' | '}
                    <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
