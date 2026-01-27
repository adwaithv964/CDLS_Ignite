import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, MapPin, Bell, Hexagon } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../../api/axios';

const SkillDevelopment = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/events/');
                const events = response.data;

                // Helper to check if a date is today or in the future
                const isTodayOrFuture = (dateStr) => {
                    if (!dateStr) return false;
                    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                        const [year, month, day] = dateStr.split('-').map(Number);
                        const eventDate = new Date(year, month - 1, day);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return eventDate >= today;
                    }
                    const eventDate = new Date(dateStr);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return eventDate >= today;
                };

                const mappedSessions = events
                    .filter(e => isTodayOrFuture(e.date))
                    .slice(0, 3) // Show only first 3 upcoming events
                    .map(event => ({
                        id: event.id,
                        tag: event.type,
                        tagColor: event.type_color || "bg-blue-500",
                        registrations: event.registrations,
                        title: event.title,
                        date: event.date, // You might want to format this
                        time: event.time,
                        location: event.location,
                        author: event.author,
                        dept: event.dept,
                        status: event.status,
                        isOpen: event.is_open,
                        imageColor: event.image_color || "bg-gray-100",
                        image: event.image
                    }));

                setSessions(mappedSessions);
            } catch (error) {
                console.error("Failed to fetch events for home page", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Helper for date formatting
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        if (!isNaN(Date.parse(dateStr))) {
            return new Date(dateStr).toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
        }
        return dateStr;
    };

    // Helper for time formatting
    const formatTime = (timeStr) => {
        if (!timeStr) return '';
        if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(timeStr)) {
            return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        }
        return timeStr;
    };


    return (
        <section className="py-20 bg-gray-50 relative overflow-hidden">

            {/* Decorative background pattern */}
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
                {/* Floating icons for visual appeal */}
                <div className="absolute top-10 left-10 text-gray-900 text-9xl transform -rotate-12">★</div>
                <div className="absolute bottom-10 right-10 text-gray-900 text-9xl transform rotate-12">♫</div>
                <div className="absolute top-1/2 left-1/4 text-gray-900 text-8xl transform rotate-45">☁</div>
            </div>


            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
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
                    <Link to="/events" className="hidden md:flex bg-[#22C59E] hover:bg-teal-500 text-white px-8 py-3 rounded-full font-medium transition-colors items-center shadow-lg shadow-teal-500/30">
                        Explore Events <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>

                {/* Session Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full text-center py-10 text-gray-400">Loading events...</div>
                    ) : sessions.length > 0 ? (
                        sessions.map((session) => (
                            <div key={session.id} className="bg-white p-5 rounded-sm shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col h-full">

                                {/* Card Image Section */}
                                <div className={`h-48 rounded-sm mb-6 relative overflow-hidden ${session.imageColor} flex items-center justify-center`}>
                                    {session.image ? (
                                        <img src={session.image} alt={session.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-gray-400 font-bold opacity-30 text-xl uppercase tracking-widest">Image</div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className={`${session.tagColor} text-white text-[10px] font-bold px-3 py-1 rounded-sm shadow-sm`}>
                                            {session.tag}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="flex-grow">
                                    <div className="mb-3">
                                        <span className="text-[10px] font-bold text-yellow-500 bg-yellow-50 px-2 py-1 rounded">Registrations: {session.registrations}</span>
                                    </div>
                                    <h3 className="font-bold text-lg text-[#1B2A41] mb-6 min-h-[56px] leading-snug">
                                        {session.title}
                                    </h3>

                                    <div className="flex items-center text-[10px] text-gray-500 space-x-4 mb-4 font-medium">
                                        <div className="flex items-center"><Clock size={12} className="mr-1.5" /> {formatDate(session.date)}</div>
                                        <div className="flex items-center"><Clock size={12} className="mr-1.5" /> {formatTime(session.time)}</div>
                                        <div className="flex items-center"><MapPin size={12} className="mr-1.5" /> {session.location}</div>
                                    </div>

                                    <hr className="border-gray-100 mb-4" />

                                    <div className="flex items-start space-x-3 text-[10px] text-gray-500 mb-6">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden text-center flex items-center justify-center font-bold text-gray-500">
                                            {/* Avatar Icon */}
                                            {session.author ? session.author.charAt(0) : '?'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-700">By {session.author}</p>
                                            <p className="text-gray-400 text-[9px]">{session.dept}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="flex justify-between items-center text-xs mt-auto pt-2">
                                    <span className="font-bold text-[#1B2A41]">{session.status}</span>
                                    {session.isOpen ? (
                                        <Link to="/events" className="text-gray-400 hover:text-[#1B2A41] font-medium transition-colors">View Details</Link>
                                    ) : (
                                        <button className="text-gray-400 hover:text-[#1B2A41] flex items-center font-medium transition-colors">
                                            <Bell size={12} className="mr-1.5" /> Notify Next Time
                                        </button>
                                    )}
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-500">No upcoming events found.</div>
                    )}
                </div>

                {/* Mobile Action Button */}
                <div className="mt-12 md:hidden flex justify-center">
                    <Link to="/events" className="bg-[#22C59E] hover:bg-teal-500 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center shadow-lg shadow-teal-500/30">
                        Explore Events <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default SkillDevelopment;
