import React from 'react';
import { ArrowRight, Clock, MapPin, Bell, Hexagon } from 'lucide-react';
import { Link } from 'react-router-dom';

const SkillDevelopment = () => {

    // Data for the sessions
    const sessions = [
        {
            id: 1,
            tag: "Beginners",
            tagColor: "bg-[#F15A29]", // Orange
            registrations: 30,
            title: "Robotics For Daily Life And Innovation",
            date: "10 April",
            time: "10:00 AM",
            location: "CDLS Office",
            author: "Sara Francis",
            dept: "Department of Robotics: NIT Calicut",
            status: "Open",
            isOpen: true,
            imageColor: "bg-blue-100" // Placeholder for image background
        },
        {
            id: 2,
            tag: "Advanced",
            tagColor: "bg-[#F43F5E]", // Red/Pink
            registrations: 35,
            title: "Session On Digital Marketing",
            date: "10 April",
            time: "10:00 AM",
            location: "CDLS Office",
            author: "Sara Francis",
            dept: "Department of Robotics: NIT Calicut",
            status: "Closed",
            isOpen: false,
            imageColor: "bg-sky-100"
        },
        {
            id: 3,
            tag: "Hands-on",
            tagColor: "bg-[#F15A29]", // Orange
            registrations: 5,
            title: "Web Developement For Beginners",
            date: "10 April",
            time: "10:00 AM",
            location: "CDLS Office",
            author: "Sara Francis",
            dept: "Department of Robotics: NIT Calicut",
            status: "Open",
            isOpen: true,
            imageColor: "bg-yellow-100"
        }
    ];

    return (
        <section className="py-20 bg-gray-50 relative overflow-hidden">

            {/* Doodle Background Pattern (Simulated with SVGs) */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none overflow-hidden">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="doodle-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="1" fill="#000" />
                            <path d="M50 50 L60 60" stroke="#000" strokeWidth="1" />
                            <rect x="80" y="10" width="5" height="5" stroke="#000" fill="none" />
                            <path d="M10 80 Q 20 90 30 80 T 50 80" stroke="#000" fill="none" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#doodle-pattern)" />
                </svg>
                {/* Large faint icons positioned absolutely for the "doodle" look */}
                <div className="absolute top-10 left-10 text-gray-900 text-9xl transform -rotate-12">★</div>
                <div className="absolute bottom-10 right-10 text-gray-900 text-9xl transform rotate-12">♫</div>
                <div className="absolute top-1/2 left-1/4 text-gray-900 text-8xl transform rotate-45">☁</div>
            </div>


            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center space-x-2 mb-4">
                            <Hexagon size={16} className="text-[#00D2AA]" />
                            <span className="text-[#00D2AA] font-bold text-xs tracking-widest uppercase border border-[#00D2AA] px-2 py-1 rounded-sm">WHATS COMING UP!</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1B2A41] leading-tight">
                            CDLS Offers Skill Developement<br />
                            Programs For <span className="text-[#F15A29]">Learner Members</span>
                        </h2>
                    </div>
                    <Link to="/events" className="hidden md:flex bg-[#22C59E] hover:bg-teal-600 text-white px-8 py-3 rounded-full font-medium transition-colors items-center shadow-lg shadow-teal-500/30">
                        Explore Events <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sessions.map((session) => (
                        <div key={session.id} className="bg-white p-5 rounded-sm shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col h-full">

                            {/* Image Area */}
                            <div className={`h-48 rounded-sm mb-6 relative overflow-hidden ${session.imageColor} flex items-center justify-center`}>
                                {/* Placeholder for image */}
                                <div className="text-gray-400 font-bold opacity-30 text-xl uppercase tracking-widest">Image</div>
                                <div className="absolute top-4 left-4">
                                    <span className={`${session.tagColor} text-white text-[10px] font-bold px-3 py-1 rounded-sm shadow-sm`}>
                                        {session.tag}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-grow">
                                <div className="mb-3">
                                    <span className="text-[10px] font-bold text-yellow-500 bg-yellow-50 px-2 py-1 rounded">Registrations: {session.registrations}</span>
                                </div>
                                <h3 className="font-bold text-lg text-[#1B2A41] mb-6 min-h-[56px] leading-snug">
                                    {session.title}
                                </h3>

                                <div className="flex items-center text-[10px] text-gray-500 space-x-4 mb-4 font-medium">
                                    <div className="flex items-center"><Clock size={12} className="mr-1.5" /> {session.date}</div>
                                    <div className="flex items-center"><Clock size={12} className="mr-1.5" /> {session.time}</div>
                                    <div className="flex items-center"><MapPin size={12} className="mr-1.5" /> {session.location}</div>
                                </div>

                                <hr className="border-gray-100 mb-4" />

                                <div className="flex items-start space-x-3 text-[10px] text-gray-500 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                                        {/* Avatar Placeholder */}
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-400 translate-y-1"><path d="M24 24H0V22C0 18 4 15 12 15C20 15 24 18 24 22V24Z" /><circle cx="12" cy="7" r="5" /></svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700">By {session.author}</p>
                                        <p className="text-gray-400 text-[9px]">{session.dept}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between items-center text-xs mt-auto pt-2">
                                <span className="font-bold text-[#1B2A41]">{session.status}</span>
                                {session.isOpen ? (
                                    <button className="text-gray-400 hover:text-[#1B2A41] font-medium transition-colors">View Details</button>
                                ) : (
                                    <button className="text-gray-400 hover:text-[#1B2A41] flex items-center font-medium transition-colors">
                                        <Bell size={12} className="mr-1.5" /> Notify Next Time
                                    </button>
                                )}
                            </div>

                        </div>
                    ))}
                </div>

                {/* Mobile Button */}
                <div className="mt-12 md:hidden flex justify-center">
                    <Link to="/events" className="bg-[#22C59E] hover:bg-teal-600 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center shadow-lg shadow-teal-500/30">
                        Explore Events <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default SkillDevelopment;
