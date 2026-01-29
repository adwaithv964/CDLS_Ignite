import React from 'react';

const feedback1 = "/assets/feedback_1.png";
const feedback2 = "/assets/feedback_2.jpeg";
const feedback3 = "/assets/feedback_3.png";
const usmanProfile = "/assets/usman_profile.png";
const contour = "/assets/contour.png";

const InsightsFeedback = () => {
    return (
        <section className="font-sans">
            {/* Banner section */}
            <div className="bg-[#FF5A3C] text-white text-center py-4">
                <h2 className="text-xl md:text-2xl font-medium">Insights, Feedback, and Reviews!!</h2>
            </div>

            {/* Main content area */}
            <div className="bg-[#0B1A2F] relative overflow-hidden min-h-[600px] flex items-center">
                {/* Background contour */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${contour})`, backgroundSize: 'cover' }}></div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center">

                        {/* Image section */}
                        <div className="w-full lg:w-1/2 relative z-0 h-[500px] lg:h-[600px]">
                            {/* Image 3 - Top Right/Background */}
                            <div className="absolute top-0 right-10 lg:right-20 w-48 h-64 lg:w-64 lg:h-80 shadow-lg border-4 border-white transform rotate-12 z-10 rounded-lg overflow-hidden">
                                <img src={feedback3} alt="Feedback 3" className="w-full h-full object-cover" />
                            </div>

                            {/* Image 1 - Top Left/Main */}
                            <div className="absolute top-10 left-4 lg:left-10 w-56 h-72 lg:w-72 lg:h-96 shadow-xl border-4 border-white transform -rotate-6 z-20 rounded-lg overflow-hidden">
                                <img src={feedback1} alt="Feedback 1" className="w-full h-full object-cover" />
                            </div>

                            {/* Image 2 - Bottom/Overlay */}
                            <div className="absolute bottom-20 left-1/3 w-52 h-60 lg:w-64 lg:h-72 shadow-2xl border-4 border-white transform rotate-3 z-30 rounded-lg overflow-hidden">
                                <img src={feedback2} alt="Feedback 2" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Testimonial section */}
                        <div className="w-full lg:w-1/2 relative z-10 lg:-ml-20 mt-10 lg:mt-0">
                            {/* Decorative element */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#2DD4BF] hidden lg:block"
                                style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}>
                            </div>

                            <div className="bg-[#2D333F] rounded-lg shadow-2xl relative overflow-hidden max-w-xl mx-auto lg:mr-auto">
                                {/* Decorative curve */}
                                <div className="absolute top-0 right-0 w-[60%] h-full bg-[#FF5A3C]"
                                    style={{ clipPath: 'ellipse(90% 100% at 100% 0%)' }}>
                                </div>

                                <div className="p-8 md:p-12 relative z-20">
                                    <span className="text-gray-500 text-5xl font-serif leading-none italic opacity-50">“</span>

                                    <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-8 mt-2 pr-4 relative">
                                        Right time Action will find more such programs in future....It would be an initial step from govt.local side to inspire and ignite digital platform work for the new potential youths.👍👍👍👍
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-dashed border-gray-400 p-0.5">
                                                <img src={usmanProfile} alt="Usman" className="w-full h-full rounded-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-lg">Usman</h4>
                                                <p className="text-gray-400 text-xs">Journalist - Madyamam</p>
                                            </div>
                                        </div>

                                        {/* Slide indicators */}
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                                            <div className="w-2 h-2 rounded-full bg-white border border-white p-[2px] box-content bg-clip-content"></div>
                                            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default InsightsFeedback;
