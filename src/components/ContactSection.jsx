import React from 'react';
import { ArrowRight } from 'lucide-react';
import asterisk from '../assets/asterisk.png';

const ContactSection = () => {
    return (
        <section className="relative py-24 font-sans bg-[#0B1A2F]">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0f172a]/90"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Content */}
                    <div className="relative">
                        {/* Green Circle Loader Decoration */}
                        <div className="absolute -top-10 -left-10 w-12 h-12 border-t-4 border-l-4 border-[#10b981] rounded-full opacity-80" style={{ transform: 'rotate(-45deg)' }}></div>

                        <span className="text-[#ff5722] font-semibold tracking-wide text-lg block mb-2">Get In Touch</span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">How Can We Help You?</h2>

                        <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                            We are here to support you with all your questions and
                            concerns about the Community Digital Learning Space.
                            Whether you need information about our facilities,
                            programs, or how to get involved, our team is always ready
                            to guide you.
                        </p>

                        {/* White Asterisk Decoration */}
                        <div className="mt-8">
                            <img src={asterisk} alt="" className="w-12 h-12 opacity-80 filter invert brightness-0 invert-100" style={{ filter: 'brightness(0) invert(1)' }} />
                        </div>
                    </div>

                    {/* Right Column: Key Form */}
                    <div className="relative">
                        {/* Top Right Wavy Line Decoration */}
                        <div className="absolute -top-20 -right-10 w-64 h-32 pointer-events-none hidden lg:block">
                            <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 50 Q 50 10 100 50 T 190 50" stroke="white" strokeWidth="1" fill="none" />
                            </svg>
                        </div>

                        <form className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter your Name"
                                    className="w-full bg-[#f1f5f9] text-gray-800 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#10b981] placeholder-gray-500"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-[#f1f5f9] text-gray-800 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#10b981] placeholder-gray-500"
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Type your message Here"
                                    rows="4"
                                    className="w-full bg-[#f1f5f9] text-gray-800 rounded-3xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#10b981] placeholder-gray-500 resize-none"
                                ></textarea>
                            </div>

                            <div className="flex justify-end items-center relative">
                                {/* Bottom Right Wavy Decoration */}
                                <div className="absolute right-40 bottom-2 w-16 opacity-50 hidden sm:block">
                                    <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
                                        <path d="M0 10 Q 5 0 10 10 T 20 10 T 30 10 T 40 10 T 50 10 T 60 10" stroke="white" strokeWidth="1" />
                                        <path d="M0 15 Q 5 5 10 15 T 20 15 T 30 15 T 40 15 T 50 15 T 60 15" stroke="white" strokeWidth="1" />
                                        <path d="M0 20 Q 5 10 10 20 T 20 20 T 30 20 T 40 20 T 50 20 T 60 20" stroke="white" strokeWidth="1" />
                                    </svg>
                                </div>

                                <button type="submit" className="bg-[#2DD4BF] hover:bg-[#14b8a6] text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center shadow-lg">
                                    Submit <ArrowRight size={18} className="ml-2" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
