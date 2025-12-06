import React, { useState } from 'react';
import { Clock, MapPin, ArrowRight, Plus } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const EventsPage = () => {
    const [activeTab, setActiveTab] = useState('upcoming');

    const upcomingSessions = [
        {
            id: 1,
            title: "Robotics For Daily Life And Innovation",
            type: "Beginners",
            typeColor: "bg-purple-500",
            registrations: 20,
            date: "10 April",
            time: "10:00 AM",
            location: "CDLS Office",
            author: "Sara Francis",
            dept: "Department of Robotics: NIT Calicut",
            status: "Open",
            isOpen: true,
            imageColor: "bg-blue-100",
            image: "https://store-usa.arduino.cc/cdn/shop/files/AKX00022_14.extra-8_934x700.jpg?v=1727102968"
        },
        {
            id: 2,
            title: "Session On Digital Marketing",
            type: "Advanced",
            typeColor: "bg-purple-600",
            registrations: 25,
            date: "11 April",
            time: "12:00 AM",
            location: "CDLS Office",
            author: "Sara Francis",
            dept: "Department of Robotics: NIT Calicut",
            status: "Closed",
            isOpen: false,
            imageColor: "bg-sky-100",
            image: "https://img.freepik.com/premium-vector/data-graphic-laptop-smartphone-success-modern-business-data-resources_548646-292.jpg"
        },
        {
            id: 3,
            title: "Web Developement For Beginners",
            type: "Hands-on",
            typeColor: "bg-indigo-500",
            registrations: 5,
            date: "10 April",
            time: "10:00 AM",
            location: "CDLS Office",
            author: "Sara Francis",
            dept: "Department of Robotics: NIT Calicut",
            status: "Open",
            isOpen: true,
            imageColor: "bg-yellow-100",
            image: "https://ops1.vnaya.com/en/assets/Backend/upload//1662642353featur_img.jpeg"
        }
    ];

    const earlierSessions = [
        {
            id: 101,
            title: "Robotics For Daily Life And Innovation",
            type: "Beginners",
            typeColor: "bg-purple-500",
            registrations: 20,
            date: "10 April",
            time: "10:00 AM",
            location: "CDLS Office",
            author: "Sara Francis",
            dept: "Department of Robotics: NIT Calicut",
            imageColor: "bg-blue-100",
            image: "https://store-usa.arduino.cc/cdn/shop/files/AKX00022_14.extra-8_934x700.jpg?v=1727102968"
        },
        {
            id: 102,
            title: "Session On Digital Marketing",
            type: "Advanced",
            typeColor: "bg-purple-600",
            registrations: 35,
            date: "10 April",
            time: "10:00 AM",
            location: "CDLS Office",
            author: "Sara Francis",
            dept: "Department of Robotics: NIT Calicut",
            imageColor: "bg-sky-100",
            image: "https://img.freepik.com/premium-vector/data-graphic-laptop-smartphone-success-modern-business-data-resources_548646-292.jpg"
        },
        {
            id: 103,
            title: "Web Developement For Beginners",
            type: "Hands-on",
            typeColor: "bg-indigo-500",
            registrations: 5,
            date: "10 April",
            time: "10:00 AM",
            location: "CDLS Office",
            author: "Sara Francis",
            dept: "Department of Robotics: NIT Calicut",
            imageColor: "bg-yellow-100",
            image: "https://ops1.vnaya.com/en/assets/Backend/upload//1662642353featur_img.jpeg"
        },
        {
            id: 104,
            title: "Robotics For Daily Life And Innovation",
            type: "Beginners",
            typeColor: "bg-purple-500",
            registrations: 20,
            date: "10 April",
            time: "10:00 AM",
            location: "CDLS Office",
            author: "Sara Francis",
            dept: "Department of Robotics: NIT Calicut",
            imageColor: "bg-blue-100",
            image: "https://store-usa.arduino.cc/cdn/shop/files/AKX00022_14.extra-8_934x700.jpg?v=1727102968"
        },
        {
            id: 105,
            title: "Session On Digital Marketing",
            type: "Advanced",
            typeColor: "bg-purple-600",
            registrations: 35,
            date: "10 April",
            time: "10:00 AM",
            location: "CDLS Office",
            author: "Sara Francis",
            dept: "Department of Robotics: NIT Calicut",
            imageColor: "bg-sky-100",
            image: "https://img.freepik.com/premium-vector/data-graphic-laptop-smartphone-success-modern-business-data-resources_548646-292.jpg"
        },
        {
            id: 106,
            title: "Web Developement For Beginners",
            type: "Hands-on",
            typeColor: "bg-indigo-500",
            registrations: 5,
            date: "10 April",
            time: "10:00 AM",
            location: "CDLS Office",
            author: "Sara Francis",
            dept: "Department of Robotics: NIT Calicut",
            imageColor: "bg-yellow-100",
            image: "https://ops1.vnaya.com/en/assets/Backend/upload//1662642353featur_img.jpeg"
        }
    ];

    const renderCard = (session, isEarlier = false) => (
        <div key={session.id} className="bg-white p-6 rounded-none shadow-sm h-full flex flex-col justify-between hover:shadow-md transition-shadow border border-gray-100">
            <div>
                {/* Image Area */}
                <div className={`h-48 rounded-sm mb-6 relative overflow-hidden ${session.imageColor || 'bg-gray-100'} flex items-center justify-center`}>
                    {session.image ? (
                        <img src={session.image} alt={session.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-gray-400 font-bold opacity-30 text-xl uppercase tracking-widest">Image</div>
                    )}
                    <div className="absolute top-4 left-4">
                        <span className={`${session.typeColor} text-white text-[10px] font-bold px-3 py-1 rounded-sm shadow-sm`}>
                            {session.type}
                        </span>
                    </div>
                </div>

                <div className="mb-4">
                    <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded">Registrations: {session.registrations}</span>
                </div>
                <h3 className="font-bold text-base text-[#1B2A41] mb-6 min-h-[48px]">
                    {session.title}
                </h3>
                <div className="flex items-center text-[10px] text-gray-500 space-x-4 mb-4">
                    <div className="flex items-center"><Clock size={12} className="mr-1" /> {session.date}</div>
                    <div className="flex items-center"><Clock size={12} className="mr-1" /> {session.time}</div>
                    <div className="flex items-center"><MapPin size={12} className="mr-1" /> {session.location}</div>
                </div>
                <hr className="border-gray-100 mb-4" />
                <div className="flex items-start space-x-2 text-[10px] text-gray-500 mb-6">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-500">
                        {session.author.charAt(0)}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">By {session.author}</p>
                        <p className="text-gray-400">{session.dept}</p>
                    </div>
                </div>
            </div>

            {isEarlier ? (
                <div className="flex justify-center">
                    <button className="bg-[#E0D4FC] hover:bg-purple-200 text-[#6B46C1] font-bold text-xs py-2 px-8 rounded-full transition-colors flex items-center">
                        Read More <ArrowRight size={14} className="ml-1" />
                    </button>
                </div>
            ) : (
                <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#1B2A41]">{session.status}</span>
                    {session.isOpen ? (
                        <button className="text-gray-400 hover:text-[#1B2A41]">View Details</button>
                    ) : (
                        <button className="text-gray-400 hover:text-[#1B2A41] flex items-center"><span className="w-2 h-2 bg-gray-400 rounded-full mr-1"></span> Notify Next Time</button>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div className="font-sans text-gray-800 bg-gray-50 min-h-screen flex flex-col">
            <Header />

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-12 relative overflow-x-hidden">

                {/* Background Decoration - Weak Wave Lines - Abstract */}
                <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none opacity-20 -z-10 overflow-hidden">
                    <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0,100 Q250,200 500,100 T1000,100" fill="none" stroke="#E2E8F0" strokeWidth="2" />
                        <path d="M0,200 Q250,300 500,200 T1000,200" fill="none" stroke="#E2E8F0" strokeWidth="2" />
                        <path d="M0,300 Q250,400 500,300 T1000,300" fill="none" stroke="#E2E8F0" strokeWidth="2" />
                        <path d="M0,400 Q250,500 500,400 T1000,400" fill="none" stroke="#E2E8F0" strokeWidth="2" />
                    </svg>
                </div>

                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-24 relative mt-10">
                    {/* Left Column Text */}
                    <div className="lg:w-1/2 pr-0 lg:pr-12 mb-16 lg:mb-0 relative z-10 w-full">
                        <span className="text-[#8B5CF6] font-bold tracking-widest text-xs uppercase mb-4 block">FROM CODE TO CLOUD!!</span>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1B2A41] mb-6 leading-tight">
                            Host It Right! Explore The<br />
                            Essentials Of Website<br />
                            Hosting.
                        </h1>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xl mb-12">
                            This session introduces the fundamentals of website hosting —
                            the essential step that makes your website accessible to the
                            world. Participants will learn what web hosting is, how it works,
                            and the different types of hosting services available. The session
                            will also cover practical aspects like choosing a hosting
                            provider, setting up a domain, and deploying a simple website
                            online.
                        </p>

                        {/* Dotted Arrow Decoration */}
                        <div className="absolute -bottom-24 left-1/4 hidden lg:block transform translate-x-0 translate-y-4">
                            <svg width="400" height="150" viewBox="0 0 400 150" fill="none">
                                <path
                                    d="M20,20 Q200,120 380,50"
                                    stroke="#1B2A41"
                                    strokeWidth="2"
                                    strokeDasharray="6 6"
                                    fill="none"
                                    markerEnd="url(#arrowhead)"
                                />
                                <defs>
                                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#1B2A41" />
                                    </marker>
                                </defs>
                            </svg>
                        </div>
                    </div>

                    {/* Right Column Image & Cards */}
                    <div className="lg:w-1/2 relative z-10 flex justify-end w-full">
                        <div className="relative w-full max-w-[600px]">
                            {/* Beginners Badge */}
                            <div className="absolute -top-5 left-0 z-30 transform -translate-x-4">
                                <span className="bg-[#8B5CF6] text-white text-sm font-medium px-8 py-3 rounded-md shadow-lg">
                                    Beginners
                                </span>
                            </div>

                            {/* Main Image */}
                            <div className="rounded-tl-[60px] rounded-br-[60px] overflow-hidden shadow-2xl relative z-20 h-[400px] w-full">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                                    alt="Students studying together"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Registrations Card - Floating */}
                            <div className="absolute bottom-10 -left-12 bg-white p-5 rounded-xl shadow-[0_15px_30px_rgb(0,0,0,0.15)] z-30 min-w-[220px]">
                                <div className="flex flex-col">
                                    <div className="mb-3">
                                        <span className="text-3xl font-bold text-[#8B5CF6]">25</span>
                                        <span className="text-[#1B2A41] text-lg font-medium ml-2">Registrations</span>
                                    </div>
                                    <div className="flex items-center -space-x-3">
                                        <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=100&h=100" className="w-full h-full object-cover" alt="User 1" />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=100&h=100" className="w-full h-full object-cover" alt="User 2" />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=100&h=100" className="w-full h-full object-cover" alt="User 3" />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-[#003B5C] flex items-center justify-center text-white cursor-pointer hover:bg-[#002a42] transition-colors">
                                            <Plus size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sessions Section */}
                <div className="mb-20">
                    <div className="flex space-x-12 border-b border-gray-200 mb-8">
                        <div className="relative pb-2">
                            <button
                                onClick={() => setActiveTab('upcoming')}
                                className={`font-bold text-sm transition-colors ${activeTab === 'upcoming' ? 'text-[#1B2A41]' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Upcoming Sessions
                            </button>
                            {activeTab === 'upcoming' && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1B2A41] rounded-t-md"></div>
                            )}
                        </div>

                        <div className="relative pb-2">
                            <button
                                onClick={() => setActiveTab('earlier')}
                                className={`font-bold text-sm transition-colors ${activeTab === 'earlier' ? 'text-[#1B2A41]' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Earlier Sessions
                            </button>
                            {activeTab === 'earlier' && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1B2A41] rounded-t-md"></div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activeTab === 'upcoming'
                            ? upcomingSessions.map(session => renderCard(session, false))
                            : earlierSessions.map(session => renderCard(session, true))
                        }
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EventsPage;
