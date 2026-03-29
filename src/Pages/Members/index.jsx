import React, { useState, useEffect } from 'react';
import { Users, Briefcase, GraduationCap } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MaintenancePage from '../../components/MaintenancePage';
import { useMaintenanceMode } from '../../context/MaintenanceContext';
import MemberProfileModal from './components/MemberProfileModal';
import api from '../../api/axios';

const TAB_CONFIG = [
    { key: 'learner',    label: 'Learner Members', icon: <Users size={32} className="text-[#1B2A41]" />,        color: 'bg-[#FFEDD5]', sectionLabel: 'Learners', heading: "Faces Of CDLS: Get To Know\nOur Learners" },
    { key: 'gig_worker', label: 'Gig Workers',     icon: <Briefcase size={32} className="text-[#1B2A41]" />,    color: 'bg-[#FFEDD5]', sectionLabel: 'Gig Workers', heading: "In The Spotlight: Our Gig\nWorkers" },
    { key: 'mentor',     label: 'Mentors',          icon: <GraduationCap size={32} className="text-[#1B2A41]" />, color: 'bg-[#FFEDD5]', sectionLabel: 'Mentors', heading: "Meet The Mentors: Guiding\nLights Of CDLS" },
];

const Members = () => {
    const { isUnderMaintenance, message } = useMaintenanceMode('members');
    const [activeTab, setActiveTab] = useState('learner');
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await api.get('/members/');
                setMembers(res.data);
            } catch (e) {
                console.error('Failed to fetch members', e);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    if (isUnderMaintenance) {
        return <MaintenancePage pageName="Members section" message={message} />;
    }

    const countOf = (type) => members.filter(m => m.member_type === type).length;
    const activeMembers = members.filter(m => m.member_type === activeTab);
    const activeConfig = TAB_CONFIG.find(t => t.key === activeTab);

    return (
        <div className="font-sans text-gray-800 bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow w-full">

                {/* Stats Section */}
                <div className="bg-gray-100 py-16 px-4 relative overflow-hidden">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <p className="text-[#1B2A41] text-lg max-w-3xl mx-auto leading-relaxed">
                                MEMBERS OF CDLS ARE PASSIONATE INDIVIDUALS WHO COLLABORATE, LEARN, AND
                                INNOVATE TOGETHER TO PROMOTE DIGITAL LEARNING AND COMMUNITY DEVELOPMENT.
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 mt-12">
                            {TAB_CONFIG.map((tab, index) => (
                                <React.Fragment key={tab.key}>
                                    <div
                                        className="flex flex-col items-center px-12 relative group cursor-pointer"
                                        onClick={() => setActiveTab(tab.key)}
                                    >
                                        <div className={`w-24 h-24 rounded-full ${tab.color} border-2 border-[#F15A29] flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${activeTab === tab.key ? 'ring-4 ring-orange-200' : ''}`}>
                                            {tab.icon}
                                        </div>
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-[#1B2A41] mb-1">
                                                {loading ? '—' : countOf(tab.key)}
                                            </div>
                                            <div className={`font-medium ${activeTab === tab.key ? 'text-[#F15A29]' : 'text-[#1B2A41]'}`}>
                                                {tab.label}
                                            </div>
                                        </div>
                                    </div>
                                    {index < TAB_CONFIG.length - 1 && (
                                        <div className="hidden md:block h-32 border-l-2 border-dotted border-gray-400 mx-4"></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Members Grid */}
                <div className="bg-[#FFFBF0] py-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="mb-12">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-[#F15A29] p-1 rounded">
                                    {activeConfig?.icon && React.cloneElement(activeConfig.icon, { size: 16, className: 'text-white' })}
                                </div>
                                <span className="text-[#F15A29] font-bold uppercase tracking-wider text-sm">
                                    {activeConfig?.sectionLabel}
                                </span>
                            </div>
                            <h2 className="text-4xl font-bold text-[#1B2A41] mb-2 leading-tight">
                                {activeConfig?.heading.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                                ))}
                            </h2>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-20 text-gray-400">Loading members…</div>
                        ) : activeMembers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                <Users size={48} className="mb-4 opacity-30" />
                                <p className="text-lg">No {activeConfig?.sectionLabel} yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {activeMembers.map((member) => (
                                    <div
                                        key={member.id}
                                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
                                    >
                                        {/* Profile Image */}
                                        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                            {member.image_url ? (
                                                <img
                                                    src={member.image_url}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-gray-300">
                                                    {member.name?.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Member Details */}
                                        <div className="relative p-6 pt-8">
                                            {/* View Button */}
                                            <button
                                                onClick={() => setSelectedMember(member)}
                                                className="absolute -top-5 right-4 bg-[#00A99D] text-white px-6 py-2 text-sm font-medium shadow-lg hover:bg-teal-500 transition-colors z-20 flex items-center gap-1"
                                            >
                                                View
                                            </button>

                                            <h3 className="text-lg font-bold text-[#1B2A41] mb-1">{member.name}</h3>
                                            <p className="text-[#F15A29] text-sm font-medium">{member.institution}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </main>
            <Footer />

            {/* Profile Modal */}
            {selectedMember && (
                <MemberProfileModal
                    member={selectedMember}
                    onClose={() => setSelectedMember(null)}
                />
            )}
        </div>
    );
};

export default Members;
