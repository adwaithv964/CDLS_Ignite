import React from 'react';
import { ArrowRight, Ticket } from 'lucide-react';
import asterisk from '../assets/asterisk.png';

const Events = () => {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Top Left Decorative Red Curve - Abstract representation */}
            <div className="absolute top-10 left-10 md:left-20 w-12 h-12 border-t-4 border-l-4 border-red-500 rounded-tl-full opacity-80" style={{ transform: 'rotate(-15deg)' }}></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Content */}
                    <div className="relative">
                        {/* Chevron Pattern - floated or absolute near title */}
                        <div className="absolute -top-16 left-1/3 opacity-20 hidden md:block">
                            <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
                                <path d="M10 10 L 20 20 L 10 30" stroke="currentColor" strokeWidth="2" />
                                <path d="M25 10 L 35 20 L 25 30" stroke="currentColor" strokeWidth="2" />
                                <path d="M40 10 L 50 20 L 40 30" stroke="currentColor" strokeWidth="2" />
                                <path d="M55 10 L 65 20 L 55 30" stroke="currentColor" strokeWidth="2" />
                                <path d="M70 10 L 80 20 L 70 30" stroke="currentColor" strokeWidth="2" />
                                <path d="M85 10 L 95 20 L 85 30" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>

                        <div className="flex items-center space-x-2 mb-4 text-[#4fd1c5]">
                            <Ticket size={18} className="rotate-45" />
                            <span className="font-semibold tracking-wider text-sm uppercase">Book Your Slot</span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-8 leading-tight">
                            Community Led <span className="text-[#ff5722]">Events</span> At <br />
                            CDLS
                        </h2>

                        <div className="space-y-6 text-[#334155] text-lg font-medium leading-relaxed">
                            <p>
                                Searching for the ideal space to develop your tech ideas and
                                collaborations? Welcome to CDLS.
                            </p>
                            <p className="text-gray-500 font-normal text-base">
                                CDLS provides its facilities for the public to host events, workshops, and
                                professional gatherings. The space is equipped to support knowledge-sharing
                                and community development initiatives in a collaborative environment.
                            </p>
                        </div>

                        <div className="mt-10 relative">
                            {/* Graduation Cap Decorative Element (SVG) */}
                            <div className="absolute -right-8 -top-12 opacity-30 pointer-events-none hidden md:block">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#4fd1c5" strokeWidth="1" className="transform rotate-12">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                            </div>

                            <button className="bg-[#10b981] hover:bg-[#059669] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl flex items-center group">
                                Host An Event
                                <span className="bg-white/20 rounded-full p-1 ml-3 group-hover:translate-x-1 transition-transform">
                                    <ArrowRight size={16} />
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Images & Decoration */}
                    <div className="relative">
                        {/* Dotted Grid Pattern (Top Left) */}
                        <div className="absolute -top-12 -left-12 w-32 h-32 opacity-60 z-0">
                            <svg width="100%" height="100%" fill="none">
                                <pattern id="dotGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <circle cx="2" cy="2" r="2" className="text-gray-300" fill="currentColor" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#dotGrid)" />
                            </svg>
                        </div>

                        {/* Green Asterisk (Top Right) */}
                        <div className="absolute -top-10 -right-10 z-20 w-16 h-16 animate-spin-slow">
                            <img src={asterisk} alt="" className="w-full text-[#10b981]" style={{ filter: 'hue-rotate(90deg) brightness(1.2)' }} />
                        </div>

                        {/* Main Image Container */}
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl bg-gray-100 pb-[10%] pr-[5%]">
                            {/* Using a placeholder image for now as specific asset wasn't found */}
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                                alt="Students collaborating"
                                className="w-full h-auto object-cover rounded-tl-3xl rounded-bl-3xl"
                                style={{
                                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 85%, 85% 100%, 0 100%)' // Trying to mimic the cutout shape
                                }}
                            />

                            <div className="absolute inset-0 bg-transparent rounded-3xl pointer-events-none"></div>
                        </div>

                        {/* Red Border Shape Overlay (Bottom Right) */}
                        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 z-20 pointer-events-none translate-x-4 translate-y-4">
                            {/* This is the red outline shape */}
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                                <path d="M10 10 H 90 V 90 H 50 V 60 H 10 V 10" stroke="#ff5722" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                        </div>

                        {/* White box overlay inside the red shape */}
                        <div className="absolute bottom-4 right-2 w-24 h-20 bg-white rounded-lg z-30 shadow-sm hidden md:block"></div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Events;
