import React from 'react';
import { Globe, ShieldCheck, Users, Monitor, Pencil, Heart, Lightbulb, Cloud, Bot, Diamond } from 'lucide-react';

const FacilityCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-6 lg:p-8 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full border border-gray-100">
        <div className="mb-6 text-[#00D2AA]">
            <Icon size={48} strokeWidth={1.5} />
        </div>
        <h3 className="text-lg lg:text-xl font-bold text-[#1B2A41] mb-4 leading-tight min-h-[56px] flex items-center justify-center">
            {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
            {description}
        </p>
    </div>
);

const Facilities = () => {
    const facilities = [
        {
            icon: Globe,
            title: "High Speed Internet, LAN Connectivity",
            description: "High-speed internet with reliable LAN connectivity for smooth work and collaboration"
        },
        {
            icon: ShieldCheck,
            title: "Reliable Internet And Power Supply",
            description: "Reliable internet access and continuous power supply to support professional work."
        },
        {
            icon: Users,
            title: "Meeting Room & Event Space",
            description: "A fully equipped meeting room designed for professional discussions, team collaborations, and presentations."
        },
        {
            icon: Monitor,
            title: "LED TV Screens",
            description: "LED television screens for professional presentations, video conferences, and multimedia display purposes."
        }
    ];

    return (
        <section className="py-20 lg:py-28 bg-[#F9FAFB] relative overflow-hidden">

            {/* Background doodles */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none select-none overflow-hidden text-gray-900">
                {/* Floating icons */}
                <div className="absolute top-10 left-10 transform -rotate-12"><Heart size={120} strokeWidth={1} /></div>
                <div className="absolute top-40 left-32 transform rotate-45"><Pencil size={80} strokeWidth={1} /></div>


                <div className="absolute top-10 left-1/3 transform -rotate-6"><Lightbulb size={100} strokeWidth={1} /></div>


                <div className="absolute top-20 right-20 transform rotate-12"><Bot size={110} strokeWidth={1} /></div>
                <div className="absolute top-60 right-10 transform -rotate-12"><Cloud size={90} strokeWidth={1} /></div>


                <div className="absolute bottom-20 left-10 transform rotate-12"><div className="text-9xl font-serif border border-gray-900 rounded-full w-40 h-40 flex items-center justify-center">G</div></div>


                <div className="absolute bottom-10 right-1/4 transform -rotate-6"><div className="text-6xl font-sans opacity-50">ABC</div></div>
                <div className="absolute bottom-40 right-20 transform rotate-45"><Pencil size={60} strokeWidth={1} /></div>
            </div>


            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 lg:mb-20">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <Diamond size={12} className="text-[#00D2AA]" fill="#00D2AA" />
                        <span className="text-[#00D2AA] font-bold tracking-widest uppercase text-xs">EXPLORE CDLS</span>
                        <Diamond size={12} className="text-[#00D2AA]" fill="#00D2AA" />
                    </div>

                    <h2 className="text-3xl lg:text-5xl font-extrabold text-[#1B2A41]">
                        Facilities And Services
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {facilities.map((facility, index) => (
                        <FacilityCard key={index} {...facility} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Facilities;
