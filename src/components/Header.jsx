import React, { useState } from 'react';
import { Menu, X, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col w-full z-50">
            {/* Top Bar */}
            <div className="bg-[#1B2A41] text-white text-xs py-2">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-1">
                            <Mail size={14} className="text-[#F15A29]" />
                            <span>info@cdls.in</span>
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
                        <div className="flex space-x-3 text-white">
                            <Facebook size={14} />
                            <Twitter size={14} />
                            <Instagram size={14} />
                            <Linkedin size={14} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <header className="bg-white shadow-sm sticky top-0">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-2xl font-bold text-[#1B2A41] leading-tight text-center md:text-left">
                                Community Digital<br />Learning Space
                            </Link>
                        </div>

                        {/* Desktop Menu - Centered */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/" className="text-[#1B2A41] hover:text-[#F15A29] font-medium transition-colors">Home</Link>
                            <Link to="/events" className="text-[#1B2A41] hover:text-[#F15A29] font-medium transition-colors">Events</Link>
                            <a href="#" className="text-[#1B2A41] hover:text-[#F15A29] font-medium transition-colors">Members</a>
                            <a href="#" className="text-[#1B2A41] hover:text-[#F15A29] font-medium transition-colors">Community</a>
                            <a href="#" className="text-[#1B2A41] hover:text-[#F15A29] font-medium transition-colors">CDLS</a>
                        </div>

                        {/* Action Buttons */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link to="/login" className="bg-[#00D2AA] hover:bg-teal-500 text-white px-6 py-2 rounded-full font-medium flex items-center text-sm shadow-md transition-all">
                                Login <ArrowRight size={16} className="ml-1" />
                            </Link>
                            <Link to="/register" className="text-[#F15A29] font-bold text-sm hover:underline">
                                Register
                            </Link>
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
                            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-[#F15A29] bg-orange-50">Home</Link>
                            <Link to="/events" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Events</Link>
                            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Members</a>
                            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Community</a>
                            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">CDLS</a>
                            <div className="px-3 py-2 flex flex-col space-y-3 mt-4 border-t pt-4">
                                <Link to="/login" className="block w-full text-center bg-[#00D2AA] text-white px-5 py-2 rounded-full font-medium">
                                    Login
                                </Link>
                                <Link to="/register" className="block w-full text-center text-[#F15A29] font-bold">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Header;
