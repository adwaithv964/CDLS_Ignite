import React, { useState } from 'react';
import { ArrowRight, Ticket } from 'lucide-react';
const starGreen = "/assets/star_green.png";
const commEvent1 = "/assets/comm_event_1.png";
const commEvent2 = "/assets/comm_event_2.jpeg";
import HostEventForm from '../../EventsPage/components/HostEventForm';

const Events = () => {
    const [showForm, setShowForm] = useState(false);
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Decorative curved element */}
            <div className="absolute top-10 left-10 md:left-20 w-12 h-12 border-t-4 border-l-4 border-red-500 rounded-tl-full opacity-80" style={{ transform: 'rotate(-15deg)' }}></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Event details section */}
                    <div className="relative">
                        {/* Decorative pattern */}
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

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-8 leading-tight">
                            Community Led <br className="hidden md:block" /> <span className="text-[#ff5722]">Events</span> At <br />
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
                            {/* Decorative icon */}
                            <div className="absolute -right-8 -top-12 opacity-30 pointer-events-none hidden md:block">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#4fd1c5" strokeWidth="1" className="transform rotate-12">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                            </div>

                            <button
                                onClick={() => setShowForm(true)}
                                className="bg-[#10b981] hover:bg-[#059669] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl flex items-center group"
                            >
                                Host An Event
                                <span className="bg-white/20 rounded-full p-1 ml-3 group-hover:translate-x-1 transition-transform">
                                    <ArrowRight size={16} />
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Event visuals section */}
                    <div className="relative h-[400px] lg:h-[500px]">
                        {/* Background pattern */}
                        <div className="absolute -top-12 -left-12 w-32 h-32 opacity-60 z-0">
                            <svg width="100%" height="100%" fill="none">
                                <pattern id="dotGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <circle cx="2" cy="2" r="2" className="text-gray-300" fill="currentColor" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#dotGrid)" />
                            </svg>
                        </div>

                        {/* Decorative asterisk */}
                        <div className="absolute top-0 -right-10 z-20 w-16 h-16 animate-spin-slow">
                            <img src={starGreen} alt="" className="w-full" />
                        </div>

                        {/* Image 2 (Large Vertical - Bottom/Right) */}
                        <div className="absolute top-10 right-0 w-[70%] h-[90%] rounded-lg overflow-hidden shadow-xl z-10">
                            <img
                                src={commEvent2}
                                alt="Community Event"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Image 1 (Smaller Square - Top/Left Overlap) */}
                        <div className="absolute top-0 left-0 w-[50%] h-[50%] rounded-lg overflow-hidden shadow-2xl border-4 border-white z-20">
                            <img
                                src={commEvent1}
                                alt="Students Collaborating"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Event registration modal */}
            {showForm && (
                <div className="relative z-50">
                    <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                    <div className="fixed inset-0 z-50 w-screen overflow-y-auto" onClick={() => setShowForm(false)}>
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                                <HostEventForm onClose={() => setShowForm(false)} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Events;
