import React from 'react';
import { Share2 } from 'lucide-react';

const AdvisoryPanel = () => {
    const advisors = [
        {
            name: "JAISON N D",
            role: "Secretary - Panangad",
            location: "Grama Panchayat",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "MEHAR MOOSA",
            role: "Co-Founder",
            location: "TinkerSpace",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "FAWAS SHAMEEM",
            role: "Secretary - Thamarassery",
            location: "Grama Panchayat",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "JAMSHEELA",
            role: "Manager - CDLS",
            location: "",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <section className="bg-white relative font-sans pt-20 pb-20">
            {/* Split background */}
            <div className="absolute top-0 left-0 w-full h-[60%] bg-[#0f766e] overflow-hidden">
                {/* Decorative wave pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="waves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <path d="M0 50 Q 25 25 50 50 T 100 50 T 150 50" fill="none" stroke="currentColor" strokeWidth="2" className="text-white" />
                                <path d="M0 80 Q 25 55 50 80 T 100 80 T 150 80" fill="none" stroke="currentColor" strokeWidth="2" className="text-white" />
                                <path d="M0 20 Q 25 -5 50 20 T 100 20 T 150 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#waves)" />
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="transform rotate-45 border border-orange-500 w-3 h-3"></span>
                        <span className="text-orange-500 font-bold tracking-widest text-xs uppercase">Advisory Panel</span>
                        <span className="transform rotate-45 border border-orange-500 w-3 h-3"></span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">Our Circle Of Guidance</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {advisors.map((advisor, index) => (
                        <div key={index} className="group relative">
                            {/* Advisor image */}
                            <div className="relative overflow-hidden h-80 bg-gray-200">
                                <img
                                    src={advisor.image}
                                    alt={advisor.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Advisor details */}
                            <div className="bg-[#0f172a] p-6 text-center relative pt-10">
                                {/* Social share action */}
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                    <button className="bg-[#ff5722] hover:bg-[#ff3d00] text-white p-3 rounded-full shadow-lg transition-colors">
                                        <Share2 size={18} fill="currentColor" />
                                    </button>
                                </div>

                                <h3 className="text-white font-bold text-lg mb-1 uppercase">{advisor.name}</h3>
                                <p className="text-[#ff5722] text-xs font-medium">
                                    {advisor.role}
                                    {advisor.location && (
                                        <>
                                            <br />
                                            {advisor.location}
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdvisoryPanel;
