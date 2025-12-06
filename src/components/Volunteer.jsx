import React from 'react';
import { ArrowRight } from 'lucide-react';

const Volunteer = () => {
    return (
        <section className="py-20 lg:py-28 bg-white relative overflow-hidden">

            {/* Top Right Decorative Curves */}
            <div className="absolute top-0 right-0 z-0 pointer-events-none">
                {/* Large Red Curve */}
                <svg width="450" height="450" viewBox="0 0 400 400" fill="none" className="absolute top-0 right-0 transform translate-x-[25%] -translate-y-[25%]">
                    <path d="M50 0 C 50 180 180 350 400 350" stroke="#F15A29" strokeWidth="45" strokeLinecap="round" />
                </svg>
                {/* Thin Green Curve */}
                <svg width="550" height="550" viewBox="0 0 500 500" fill="none" className="absolute top-0 right-0 transform translate-x-[15%] -translate-y-[15%] opacity-100">
                    <path d="M0 100 C 150 100 350 200 500 450" stroke="#10B981" strokeWidth="2" />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 relative lg:pr-8">

                        {/* Dot Pattern - Behind Title (Top Right of Text) */}
                        <div className="absolute -top-16 right-0 lg:right-4 flex flex-wrap w-28 h-28 gap-3 opacity-20 -z-10 bg-dotted-pattern">
                            <div className="grid grid-cols-5 gap-3">
                                {[...Array(25)].map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                ))}
                            </div>
                        </div>

                        {/* Tag */}
                        <div className="flex items-center space-x-3 mb-6">
                            <span className="text-[#00D2AA]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M8 8C8 8 16 4 16 12C16 20 8 16 8 16" />
                                    <path d="M4 12C4 12 12 8 12 16C12 24 4 20 4 20" />
                                </svg>
                            </span>
                            <span className="text-[#00D2AA] text-xs lg:text-sm font-bold tracking-[0.2em] uppercase">TOGETHER WE GROW</span>
                        </div>

                        <h2 className="text-4xl lg:text-6xl font-extrabold text-[#1B2A41] mb-10 leading-[1.1] tracking-tight">
                            Volunteer & Mentorship<br />
                            Opportunities At <span className="text-[#F15A29]">CDLS</span>
                        </h2>

                        <div className="space-y-6 text-base lg:text-lg text-[#4B5563] leading-8 mb-12 max-w-xl font-medium">
                            <p>
                                We invite industry experts, entrepreneurs, educators, and professionals
                                to contribute as mentors.
                            </p>
                            <p>
                                Mentors can guide startups, support skill development, share insights,
                                and inspire the next generation of innovators.
                            </p>
                            <p className="text-[#F15A29] font-semibold text-lg lg:text-xl">
                                Together, mentors and volunteers form the backbone of CDLS —
                                creating a vibrant ecosystem of learning, collaboration, and growth.
                            </p>
                        </div>

                        <div className="relative inline-block">
                            <button className="bg-[#22C59E] hover:bg-teal-600 text-white px-10 py-4 rounded-full font-bold transition-colors flex items-center shadow-xl shadow-teal-500/30 text-base lg:text-lg">
                                Join Our Team <ArrowRight size={20} className="ml-3" />
                            </button>
                            {/* Graduation Cap Doodle - Positioning relative to button area or container */}
                            <div className="absolute top-[130%] -left-12 w-32 h-32 text-blue-200/60 hidden lg:block transform -rotate-12 pointer-events-none">
                                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M10 40 L50 25 L90 40 L50 55 Z" />
                                    <path d="M50 55 V85" />
                                    <path d="M20 45 V70 C20 70 30 80 50 80 C70 80 80 70 80 70 V45" />
                                    <circle cx="90" cy="40" r="1.5" fill="currentColor" />
                                    <path d="M90 40 L90 70 L85 75 L95 75 L90 70" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Right Visuals */}
                    {/* Added pr-16 again to maintain the 'dragged left' feel but with larger elements */}
                    <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mt-16 lg:mt-0 lg:pr-16">
                        <div className="relative w-full max-w-[450px] lg:max-w-[500px]"> {/* Increased max-width */}

                            {/* Orange Frame Background */}
                            <div className="absolute top-8 -right-8 w-full h-full bg-[#F15A29] rounded-sm z-0"></div>

                            {/* Image Container */}
                            <div className="relative z-10 w-full aspect-[4/5] bg-gray-200 overflow-hidden shadow-2xl rounded-sm">
                                <div className="w-full h-full bg-gradient-to-t from-gray-300 to-gray-100 flex items-center justify-center">
                                    {/* Placeholder Text */}
                                    <div className="text-gray-500 font-bold text-lg text-center px-8">
                                        [Student Image]<br />
                                        <span className="text-base font-normal opacity-75">Replace with actual image</span>
                                    </div>
                                </div>
                            </div>

                            {/* Dot Pattern - Bottom Left of Image */}
                            <div className="absolute -bottom-12 -left-12 z-20">
                                <div className="grid grid-cols-6 gap-3">
                                    {[...Array(24)].map((_, i) => (
                                        <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Volunteer;
