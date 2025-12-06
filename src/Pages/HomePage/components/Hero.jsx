import React from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-r from-[#FFF5F2] to-[#E6F9F6] pt-16 pb-20 overflow-hidden">

            {/* Decorative Elements - Orange Dots */}
            <div className="absolute top-1/2 left-[45%] w-2 h-2 bg-[#F15A29] rounded-full opacity-60"></div>
            <div className="absolute top-20 right-20 w-4 h-4 bg-[#F15A29] rounded-full opacity-80"></div>
            <div className="absolute bottom-10 right-1/3 w-3 h-3 bg-[#00D2AA] rounded-full opacity-60"></div>


            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 z-10">
                        <div className="inline-block bg-[#D1FAE5] text-[#00D2AA] px-4 py-1.5 rounded-sm font-semibold text-sm mb-6 shadow-sm">
                            Igniting Digital Futures.
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-[#1B2A41] leading-[1.15] mb-4">
                            A Hub For Knowledge,<br />
                            Innovation, And<br />
                            Growth.
                        </h1>
                        <p className="text-gray-600 text-lg mb-10 font-medium">
                            A Thamarassery Grama Panchayat Initiative.
                        </p>

                        <div className="bg-white p-1.5 rounded-full shadow-lg max-w-md flex items-center">
                            <input
                                type="text"
                                placeholder="Know more about CDLS?"
                                className="flex-grow px-6 py-3 bg-transparent text-gray-600 outline-none placeholder-gray-400"
                            />
                            <button className="bg-[#00D2AA] hover:bg-teal-500 text-white p-3 rounded-full transition-colors">
                                <Search size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Right Visuals */}
                    <div className="w-full lg:w-1/2 relative h-[500px]">

                        {/* 25+ Learners Floating Badge */}
                        <div className="absolute top-10 left-0 bg-white p-3 pr-5 rounded-full shadow-lg z-20 flex items-center space-x-3 animate-float-delayed">
                            <div className="text-left leading-tight pl-2">
                                <span className="block font-bold text-[#5D5FEF] text-lg">25+</span>
                                <span className="text-xs font-semibold text-gray-600">Learners</span>
                            </div>
                            <div className="flex -space-x-2">
                                <img src="/assets/image_2.png" alt="Learner 1" className="w-8 h-8 rounded-full border-2 border-white object-cover transition-transform hover:scale-110 hover:z-10 relative cursor-pointer" />
                                <img src="/assets/image_1.png" alt="Learner 2" className="w-8 h-8 rounded-full border-2 border-white object-cover transition-transform hover:scale-110 hover:z-10 relative cursor-pointer" />
                                <img src="/assets/usman_profile.png" alt="Learner 3" className="w-8 h-8 rounded-full border-2 border-white object-cover transition-transform hover:scale-110 hover:z-10 relative cursor-pointer" />
                                <div className="w-8 h-8 rounded-full bg-[#1B2A41] border-2 border-white flex items-center justify-center text-[10px] text-white transition-transform hover:scale-110 hover:z-10 relative cursor-pointer">+</div>
                            </div>
                        </div>

                        {/* Image 1 - Girl with Books (Rounded Arch shape) */}
                        <div className="absolute bottom-0 left-10 w-48 h-64 bg-purple-200 rounded-t-[100px] rounded-b-[100px] overflow-hidden border-2 border-white shadow-xl z-10 transform translate-y-8 hover:translate-y-6 transition-transform">
                            {/* Placeholder for image */}
                            <div className="w-full h-full bg-gradient-to-b from-[#E0D4FC] to-[#C4B5FD] flex items-end justify-center">
                                <img
                                    src="/assets/image_1.png"
                                    alt="Student with books"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Image 2 - Boy with Backpack (Large Blob shape) */}
                        <div className="absolute top-0 right-10 w-64 h-96 bg-blue-100 rounded-full border-4 border-white shadow-2xl overflow-hidden z-0 transition-transform duration-300 hover:-translate-y-2">
                            <div className="w-full h-full bg-[#3B82F6] flex items-end justify-center overflow-hidden">
                                <img
                                    src="/assets/image_2.png"
                                    alt="Student with backpack"
                                    className="w-full h-full object-cover object-bottom"
                                />
                            </div>
                            {/* SVG Blob mask effect simulation (simple circle for now as base) */}
                        </div>


                        {/* 35+ Communities Floating Badge */}
                        <div className="absolute bottom-20 right-0 bg-white p-4 px-6 rounded-full shadow-lg z-30 flex flex-col items-center animate-float">
                            <span className="font-bold text-[#00D2AA] text-2xl">35+</span>
                            <span className="text-xs font-semibold text-gray-500">Communities</span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
