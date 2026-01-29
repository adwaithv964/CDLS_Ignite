import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, ArrowRight, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const isActive = (path) => {
        return location.pathname === path ? "text-[#F15A29]" : "text-[#1B2A41] hover:text-[#F15A29]";
    };

    return (
        <div className="flex flex-col w-full z-50 fixed md:relative">
            {/* Top Bar */}
            <div className="bg-[#1B2A41] text-white text-xs py-2">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-1">
                            <Mail size={14} className="text-[#F15A29]" />
                            <span>info@cdlsthamarassery.in</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Phone size={14} className="text-[#F15A29]" />
                            <span>+91 8281687960</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex space-x-2">
                            <span className="text-gray-400">മലയാളം</span>
                            <span className="text-gray-600">|</span>
                            <span className="text-[#F15A29]">English</span>
                        </div>
                        <div className="flex space-x-3 text-white items-center">
                            <Facebook size={14} />
                            <a href="https://www.instagram.com/cdls.thamarassery?utm_source=qr&igsh=OXVlMWx0bWRqNmVp" target="_blank" rel="noopener noreferrer" className="hover:text-[#F15A29] transition-colors">
                                <Instagram size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <header className="bg-white shadow-sm sticky top-0">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl md:text-2xl font-bold text-[#1B2A41] leading-tight text-left">
                                Community Digital<br />Learning Space
                            </Link>
                        </div>

                        {/* Desktop Menu - Centered */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/" className={`${isActive('/')} font-medium transition-colors`}>Home</Link>
                            <Link to="/events" className={`${isActive('/events')} font-medium transition-colors`}>Events</Link>
                            <Link to="/members" className={`${isActive('/members')} font-medium transition-colors`}>Members</Link>
                            <Link to="/community" className={`${isActive('/community')} font-medium transition-colors`}>Community</Link>
                            <Link to="/cdls" className={`${isActive('/cdls')} font-medium transition-colors`}>CDLS</Link>
                        </div>

                        {/* Action Buttons */}
                        <div className="hidden md:flex items-center space-x-6">
                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="group relative bg-[#F15A29] hover:bg-orange-600 text-white px-8 py-2 rounded-full font-medium flex items-center justify-center text-sm shadow-md transition-all gap-2"
                                >
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <>
                                    <Link to="/login" className="group relative bg-[#00D2AA] hover:bg-teal-500 text-white px-8 py-2 rounded-full font-medium flex items-center justify-center text-sm shadow-md transition-all">
                                        <ArrowRight size={16} className="absolute left-4 transition-all duration-300 ease-in-out group-hover:left-[calc(100%-20px)] group-active:left-[calc(100%-20px)]" />
                                        <span>Login</span>
                                    </Link>
                                    <Link to="/register" className="text-[#F15A29] font-bold text-sm hover:underline">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-600 hover:text-primary focus:outline-none"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/' ? 'text-[#F15A29] bg-orange-50' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`}>Home</Link>
                            <Link to="/events" className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/events' ? 'text-[#F15A29] bg-orange-50' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`}>Events</Link>
                            <Link to="/members" className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/members' ? 'text-[#F15A29] bg-orange-50' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`}>Members</Link>
                            <Link to="/community" className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/community' ? 'text-[#F15A29] bg-orange-50' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`}>Community</Link>
                            <Link to="/cdls" className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/cdls' ? 'text-[#F15A29] bg-orange-50' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`}>CDLS</Link>
                            <div className="px-3 py-2 flex flex-col space-y-3 mt-4 border-t pt-4">
                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-center bg-[#F15A29] hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium flex items-center justify-center gap-2"
                                    >
                                        <LogOut size={16} />
                                        <span>Logout</span>
                                    </button>
                                ) : (
                                    <>
                                        <Link to="/login" className="block w-full text-center bg-[#00D2AA] text-white px-5 py-2 rounded-full font-medium">
                                            Login
                                        </Link>
                                        <Link to="/register" className="block w-full text-center text-[#F15A29] font-bold">
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Header;
