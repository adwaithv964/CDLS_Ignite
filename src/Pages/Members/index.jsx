import React, { useState } from 'react';
import { Users, Briefcase, GraduationCap, Grip, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Members = () => {
    const [activeTab, setActiveTab] = useState('learners');

    const stats = [
        {
            count: 5,
            label: "Learner Members",
            icon: <Users size={32} className="text-[#1B2A41]" />,
            color: "bg-[#FFEDD5]",
            type: "learners"
        },
        {
            count: 6,
            label: "Gig Workers",
            icon: <Briefcase size={32} className="text-[#1B2A41]" />,
            color: "bg-[#FFEDD5]",
            type: "gig_workers"
        },
        {
            count: 3,
            label: "Mentors",
            icon: <GraduationCap size={32} className="text-[#1B2A41]" />,
            color: "bg-[#FFEDD5]",
            type: "mentors"
        }
    ];

    const members = [
        {
            id: 1,
            name: "Asha",
            role: "M.A.M.O college Mukkam",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
            type: "Learner"
        },
        {
            id: 2,
            name: "Akshay S",
            role: "I.H.R.D Thamarassery",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
            type: "Learner"
        },
        {
            id: 3,
            name: "Jimmy Sifuentes",
            role: "Teacher",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600",
            type: "Learner"
        },
        {
            id: 4,
            name: "Micheal Hammond",
            role: "Teacher",
            image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=600",
            type: "Learner"
        }
    ];

    const gigWorkers = [
        {
            id: 1,
            name: "Dhaya",
            role: "M.A.M.O college Mukkam",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
        },
        {
            id: 2,
            name: "Shyam",
            role: "I.H.R.D Thamarassery",
            image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600",
        },
        {
            id: 3,
            name: "Alfred James",
            role: "Teacher",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
        },
        {
            id: 4,
            name: "Ansar K",
            role: "Teacher",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
        }
    ];

    const mentors = [
        {
            id: 1,
            name: "Asha",
            role: "M.A.M.O college Mukkam",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
        },
        {
            id: 2,
            name: "Akshay S",
            role: "I.H.R.D Thamarassery",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
        },
        {
            id: 3,
            name: "Jimmy Sifuentes",
            role: "Teacher",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600",
        },
        {
            id: 4,
            name: "Micheal Hammond",
            role: "Teacher",
            image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=600",
        }
    ];

    return (
        <div className="font-sans text-gray-800 bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow w-full">
                {/* Stats Section with Doodle Background Placeholder */}
                <div className="bg-gray-100 py-16 px-4 relative overflow-hidden">
                    {/* Decorative background elements would go here */}
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <p className="text-[#1B2A41] text-lg max-w-3xl mx-auto leading-relaxed">
                                MEMBERS OF CDLS ARE PASSIONATE INDIVIDUALS WHO COLLABORATE, LEARN, AND
                                INNOVATE TOGETHER TO PROMOTE DIGITAL LEARNING AND COMMUNITY DEVELOPMENT.
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 mt-12">
                            {stats.map((stat, index) => (
                                <React.Fragment key={index}>
                                    <div
                                        className="flex flex-col items-center px-12 relative group cursor-pointer"
                                        onClick={() => setActiveTab(stat.type)}
                                    >
                                        <div className={`w-24 h-24 rounded-full ${stat.color} border-2 border-[#F15A29] flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${activeTab === stat.type ? 'ring-4 ring-orange-200' : ''}`}>
                                            {stat.icon}
                                        </div>
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-[#1B2A41] mb-1">{stat.count}</div>
                                            <div className={`text-[#1B2A41] font-medium ${activeTab === stat.type ? 'text-[#F15A29]' : ''}`}>{stat.label}</div>
                                        </div>
                                    </div>
                                    {index < stats.length - 1 && (
                                        <div className="hidden md:block h-32 border-l-2 border-dotted border-gray-400 mx-4"></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Faces of CDLS Section */}
                {activeTab === 'learners' && (
                    <div className="bg-[#FFFBF0] py-16 px-4 animate-fade-in">
                        <div className="container mx-auto max-w-6xl">
                            <div className="mb-12">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="bg-[#F15A29] p-1 rounded">
                                        <Users size={16} className="text-white" />
                                    </div>
                                    <span className="text-[#F15A29] font-bold uppercase tracking-wider text-sm">Learners</span>
                                </div>
                                <h2 className="text-4xl font-bold text-[#1B2A41] mb-2 leading-tight">
                                    Faces Of CDLS: Get To Know<br />Our Learners
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {members.map((member) => (
                                    <div key={member.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                                        {/* Image Container */}
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="relative p-6 pt-8">
                                            {/* Floating Button */}
                                            <button className="absolute -top-5 right-4 bg-[#00A99D] text-white px-6 py-2 text-sm font-medium shadow-lg hover:bg-teal-600 transition-colors z-20 flex items-center gap-1">
                                                View
                                            </button>

                                            <h3 className="text-lg font-bold text-[#1B2A41] mb-1">{member.name}</h3>
                                            <p className="text-[#F15A29] text-sm font-medium">{member.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Gig Workers Section */}
                {activeTab === 'gig_workers' && (
                    <div className="bg-[#FFFBF0] py-16 px-4 animate-fade-in">
                        <div className="container mx-auto max-w-6xl">
                            <div className="mb-12">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="bg-[#F15A29] p-1 rounded">
                                        <Briefcase size={16} className="text-white" />
                                    </div>
                                    <span className="text-[#F15A29] font-bold uppercase tracking-wider text-sm">Gig Workers</span>
                                </div>
                                <h2 className="text-4xl font-bold text-[#1B2A41] mb-2 leading-tight">
                                    In The Spotlight: Our Gig<br />Workers
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {gigWorkers.map((worker) => (
                                    <div key={worker.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                                        {/* Image Container */}
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            <img
                                                src={worker.image}
                                                alt={worker.name}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="relative p-6 pt-8">
                                            {/* Floating Button */}
                                            <button className="absolute -top-5 right-4 bg-[#00A99D] text-white px-6 py-2 text-sm font-medium shadow-lg hover:bg-teal-600 transition-colors z-20 flex items-center gap-1">
                                                View
                                            </button>

                                            <h3 className="text-lg font-bold text-[#1B2A41] mb-1">{worker.name}</h3>
                                            <p className="text-[#F15A29] text-sm font-medium">{worker.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Mentors Section */}
                {activeTab === 'mentors' && (
                    <div className="bg-[#FFFBF0] py-16 px-4 animate-fade-in">
                        <div className="container mx-auto max-w-6xl">
                            <div className="mb-12">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="bg-[#F15A29] p-1 rounded">
                                        <GraduationCap size={16} className="text-white" />
                                    </div>
                                    <span className="text-[#F15A29] font-bold uppercase tracking-wider text-sm">Mentors</span>
                                </div>
                                <h2 className="text-4xl font-bold text-[#1B2A41] mb-2 leading-tight">
                                    Meet The Mentors: Guiding<br />Lights Of CDLS
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {mentors.map((mentor) => (
                                    <div key={mentor.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                                        {/* Image Container */}
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            <img
                                                src={mentor.image}
                                                alt={mentor.name}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="relative p-6 pt-8">
                                            {/* Floating Button */}
                                            <button className="absolute -top-5 right-4 bg-[#00A99D] text-white px-6 py-2 text-sm font-medium shadow-lg hover:bg-teal-600 transition-colors z-20 flex items-center gap-1">
                                                View
                                            </button>

                                            <h3 className="text-lg font-bold text-[#1B2A41] mb-1">{mentor.name}</h3>
                                            <p className="text-[#F15A29] text-sm font-medium">{mentor.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </main >
            <Footer />
        </div >
    );
};

export default Members;
