import React from 'react';
import { Mail, MapPin, Laptop } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#111111] text-white font-sans">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Column 1: Address */}
                    <div className="flex items-start lg:pr-8 lg:border-r border-gray-800">
                        <div className="bg-gray-800 p-3 rounded-full mr-4 flex-shrink-0">
                            <MapPin className="text-white" size={24} />
                        </div>
                        <div>
                            <h4 className="text-[#10b981] font-medium text-sm mb-2">Address:</h4>
                            <p className="text-xl font-bold leading-tight">
                                Building No: 3284,<br />
                                Old Bus Stand,<br />
                                Thamarassery
                            </p>
                        </div>
                    </div>

                    {/* Column 2: Working Time */}
                    <div className="flex items-start lg:px-8 lg:border-r border-gray-800">
                        <div className="bg-transparent mr-4 flex-shrink-0">
                            <Laptop className="text-white" size={40} />
                        </div>
                        <div>
                            <h4 className="text-[#10b981] font-medium text-sm mb-2">Working Time</h4>
                            <p className="text-xl font-bold leading-tight">
                                24 Hours
                            </p>
                        </div>
                    </div>

                    {/* Column 3: Subscribe */}
                    <div className="flex items-start lg:pl-8">
                        <div className="bg-gray-800 p-3 rounded-full mr-4 flex-shrink-0">
                            <Mail className="text-white" size={24} />
                        </div>
                        <div className="w-full">
                            <h4 className="text-[#10b981] font-medium text-sm mb-2">Subscribe:</h4>
                            <form className="mt-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email:"
                                    className="w-full bg-[#f3f4f6] text-gray-800 px-4 py-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                                />
                                <button
                                    type="submit"
                                    className="bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3 px-6 rounded uppercase text-sm tracking-wider transition-colors w-full sm:w-auto"
                                >
                                    Subscribe Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#1a1a1a] py-6 border-t border-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <div className="mb-4 md:mb-0">
                        Copyright © 2024 <span className="text-[#10b981] font-bold">CDLS</span> | All Rights Reserved
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <span>|</span>
                        <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
