import React, { useState } from 'react';
import { Users, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MaintenanceWrapper from '../../components/MaintenanceWrapper';

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

    // Maintenance Screen Component
    if (MAINTENANCE_MODE) {
        return (
            <div className="font-sans text-gray-800 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow w-full flex items-center justify-center px-4 py-16">
                    <div className="max-w-2xl w-full text-center">
                        {/* Animated Construction Icon */}
                        <div className="mb-8 relative animate-bounce">
                            <div className="inline-block p-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full shadow-2xl">
                                <Construction size={80} className="text-[#F15A29]" strokeWidth={1.5} />
                            </div>
                            {/* Rotating Wrench */}
                            <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-full shadow-lg animate-spin" style={{ animationDuration: '3s' }}>
                                <Wrench size={24} className="text-[#1B2A41]" />
                            </div>
                        </div>

                        {/* Main Message */}
                        <h1 className="text-5xl font-bold text-[#1B2A41] mb-4">
                            Under Maintenance
                        </h1>

                        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                            We're currently upgrading our Members section to serve you better!
                        </p>

                        {/* Info Cards */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-[#F15A29]">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Clock size={24} className="text-[#F15A29]" />
                                <h2 className="text-lg font-semibold text-[#1B2A41]">Expected Return</h2>
                            </div>
                            <p className="text-3xl font-bold text-[#F15A29] mb-2">Soon</p>
                            <p className="text-gray-500 text-sm">
                                Our team is working hard to enhance your experience
                            </p>
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                                <div className="bg-blue-500 p-2 rounded-lg mt-1">
                                    <Users size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#1B2A41] mb-1">What's Coming?</h3>
                                    <p className="text-sm text-gray-600">
                                        Enhanced member profiles, better search, and improved networking features
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                                <div className="bg-green-500 p-2 rounded-lg mt-1">
                                    <Grip size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#1B2A41] mb-1">Stay Connected</h3>
                                    <p className="text-sm text-gray-600">
                                        Follow us on social media for real-time updates and announcements
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Return Home Button */}
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 bg-[#F15A29] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <ArrowRight size={20} className="rotate-180" />
                            Return to Homepage
                        </a>

                        {/* Progress Dots */}
                        <div className="mt-12 flex justify-center gap-2">
                            <div className="w-3 h-3 bg-[#F15A29] rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-[#F15A29] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-3 h-3 bg-[#F15A29] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // Normal page content
    return (
        <div className="font-sans text-gray-800 bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow w-full">
                {/* Statistics section */}
                <div className="bg-gray-100 py-16 px-4 relative overflow-hidden">
                    {/* Background elements */}
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

                {/* Learner members section */}
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
                                        {/* Profile image */}
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Member details */}
                                        <div className="relative p-6 pt-8">
                                            {/* Action button */}
                                            <button className="absolute -top-5 right-4 bg-[#00A99D] text-white px-6 py-2 text-sm font-medium shadow-lg hover:bg-teal-500 transition-colors z-20 flex items-center gap-1">
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

                {/* Gig workers section */}
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
                                        {/* Profile image */}
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            <img
                                                src={worker.image}
                                                alt={worker.name}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Member details */}
                                        <div className="relative p-6 pt-8">
                                            {/* Action button */}
                                            <button className="absolute -top-5 right-4 bg-[#00A99D] text-white px-6 py-2 text-sm font-medium shadow-lg hover:bg-teal-500 transition-colors z-20 flex items-center gap-1">
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

                {/* Mentors section */}
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
                                        {/* Profile image */}
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            <img
                                                src={mentor.image}
                                                alt={mentor.name}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Member details */}
                                        <div className="relative p-6 pt-8">
                                            {/* Action button */}
                                            <button className="absolute -top-5 right-4 bg-[#00A99D] text-white px-6 py-2 text-sm font-medium shadow-lg hover:bg-teal-500 transition-colors z-20 flex items-center gap-1">
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

// Wrap with MaintenanceWrapper for dynamic maintenance control
export default () => (
    <MaintenanceWrapper pageKey="members">
        <Members />
    </MaintenanceWrapper>
);
