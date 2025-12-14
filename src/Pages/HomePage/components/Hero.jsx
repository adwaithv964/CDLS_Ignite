import React from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-r from-[#FFF5F2] to-[#E6F9F6] pt-28 md:pt-16 pb-12 md:pb-20 overflow-hidden">

            {/* Background decorations */}
            <div className="absolute top-1/2 left-[45%] w-2 h-2 bg-[#F15A29] rounded-full opacity-60"></div>
            <div className="absolute top-20 right-20 w-4 h-4 bg-[#F15A29] rounded-full opacity-80"></div>
            <div className="absolute bottom-10 right-1/3 w-3 h-3 bg-[#00D2AA] rounded-full opacity-60"></div>


            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Main content area */}
                    <div className="w-full lg:w-1/2 z-10 order-2 lg:order-1 pt-8 lg:pt-0">
                        <div className="inline-block bg-[#D1FAE5] text-[#00D2AA] px-4 py-1.5 rounded-sm font-semibold text-sm mb-4 md:mb-6 shadow-sm">
                            Igniting Digital Futures.
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#1B2A41] leading-[1.2] md:leading-[1.15] mb-4">
                            A Hub For Knowledge,<br />
                            Innovation, And<br />
                            Growth.
                        </h1>
                        <p className="text-gray-600 text-base md:text-lg mb-8 md:mb-10 font-medium">
                            A Thamarassery Grama Panchayat Initiative.
                        </p>

                        <div className="bg-white p-1.5 rounded-full shadow-lg max-w-md flex items-center">
                            <input
                                type="text"
                                placeholder="Know more about CDLS?"
                                className="flex-grow px-4 md:px-6 py-2 md:py-3 bg-transparent text-gray-600 outline-none placeholder-gray-400 text-sm md:text-base"
                            />
                            <button className="bg-[#00D2AA] hover:bg-teal-500 text-white p-2 md:p-3 rounded-full transition-colors">
                                <Search size={18} className="md:w-5 md:h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Visuals area */}
                    <div className="w-full lg:w-1/2 relative h-[350px] md:h-[500px] order-1 lg:order-2">

                        {/* Learners statistic badge */}
                        <div className="absolute top-4 md:top-10 left-0 bg-white p-2 md:p-3 pr-4 md:pr-5 rounded-full shadow-lg z-20 flex items-center space-x-2 md:space-x-3 animate-float-delayed transform scale-90 md:scale-100 origin-left">
                            <div className="text-left leading-tight pl-2">
                                <span className="block font-bold text-[#5D5FEF] text-base md:text-lg">25+</span>
                                <span className="text-[10px] md:text-xs font-semibold text-gray-600">Learners</span>
                            </div>
                            <div className="flex -space-x-2">
                                <img src="/assets/image_2.png" alt="Learner 1" className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white object-cover transition-transform hover:scale-110 hover:z-10 relative cursor-pointer" />
                                <img src="/assets/image_1.png" alt="Learner 2" className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white object-cover transition-transform hover:scale-110 hover:z-10 relative cursor-pointer" />
                                <img src="/assets/usman_profile.png" alt="Learner 3" className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white object-cover transition-transform hover:scale-110 hover:z-10 relative cursor-pointer" />
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#1B2A41] border-2 border-white flex items-center justify-center text-[8px] md:text-[10px] text-white transition-transform hover:scale-110 hover:z-10 relative cursor-pointer">+</div>
                            </div>
                        </div>

                        {/* Primary image */}
                        <div className="absolute bottom-0 left-4 md:left-10 w-32 md:w-48 h-48 md:h-64 bg-purple-200 rounded-t-[60px] md:rounded-t-[100px] rounded-b-[60px] md:rounded-b-[100px] overflow-hidden border-2 border-white shadow-xl z-10 transform translate-y-8 hover:translate-y-6 transition-transform">
                            {/* Image wrapper */}
                            <div className="w-full h-full bg-gradient-to-b from-[#E0D4FC] to-[#C4B5FD] flex items-end justify-center">
                                <img
                                    src="/assets/image_1.png"
                                    alt="Student with books"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Secondary image */}
                        <div className="absolute top-0 right-4 md:right-10 w-48 md:w-64 h-64 md:h-96 bg-blue-100 rounded-full border-4 border-white shadow-2xl overflow-hidden z-0 transition-transform duration-300 hover:-translate-y-2">
                            <div className="w-full h-full bg-[#3B82F6] flex items-end justify-center overflow-hidden">
                                <img
                                    src="/assets/image_2.png"
                                    alt="Student with backpack"
                                    className="w-full h-full object-cover object-bottom"
                                    style={{ objectPosition: 'center 20%' }}
                                />
                            </div>
                            {/* Blob mask effect */}
                        </div>


                        {/* Communities statistic badge */}
                        <div className="absolute bottom-10 md:bottom-20 right-0 md:-right-4 lg:right-0 bg-white p-3 md:p-4 px-4 md:px-6 rounded-full shadow-lg z-30 flex flex-col items-center animate-float transform scale-90 md:scale-100 origin-right">
                            <span className="font-bold text-[#00D2AA] text-xl md:text-2xl">35+</span>
                            <span className="text-[10px] md:text-xs font-semibold text-gray-500">Communities</span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
