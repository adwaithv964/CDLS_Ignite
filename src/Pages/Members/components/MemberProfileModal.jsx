import React from 'react';
import { X, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const MemberProfileModal = ({ member, onClose }) => {
    if (!member) return null;

    const tags = member.tags
        ? member.tags.split(',').map(t => t.trim()).filter(Boolean)
        : [];

    const skills = member.expertise_skills
        ? member.expertise_skills.split(',').map(s => s.trim()).filter(Boolean)
        : [];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
                style={{ minHeight: '400px', maxHeight: '90vh' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
                >
                    <X size={20} className="text-gray-500" />
                </button>

                {/* Left Panel — lavender */}
                <div
                    className="flex flex-col items-center py-10 px-8 md:w-64 flex-shrink-0"
                    style={{ backgroundColor: '#E8E6F0' }}
                >
                    {/* Profile Photo */}
                    <div className="w-44 h-52 rounded-xl overflow-hidden shadow-lg mb-4 bg-gray-200">
                        {member.image_url ? (
                            <img
                                src={member.image_url}
                                alt={member.name}
                                className="w-full h-full object-cover object-top"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-bold">
                                {member.name?.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Role Tags */}
                    {tags.length > 0 && (
                        <p className="text-xs font-bold text-purple-600 tracking-widest uppercase text-center mb-6">
                            {tags.join(' · ')}
                        </p>
                    )}

                    {/* Contact Info */}
                    <div className="w-full space-y-3 text-sm text-gray-600">
                        {member.phone && (
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="text-purple-500 flex-shrink-0" />
                                <span>{member.phone}</span>
                            </div>
                        )}
                        {member.location && (
                            <div className="flex items-center gap-2">
                                <MapPin size={14} className="text-purple-500 flex-shrink-0" />
                                <span>{member.location}</span>
                            </div>
                        )}
                        {member.email && (
                            <div className="flex items-center gap-2">
                                <Mail size={14} className="text-purple-500 flex-shrink-0" />
                                <span className="break-all">{member.email}</span>
                            </div>
                        )}
                    </div>

                    {/* Contact Button */}
                    {member.email && (
                        <a
                            href={`mailto:${member.email}`}
                            className="mt-6 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all shadow-md w-full justify-center"
                        >
                            Contact <ArrowRight size={16} />
                        </a>
                    )}
                </div>

                {/* Right Panel — white */}
                <div className="flex-1 p-8 overflow-y-auto">
                    {/* Name */}
                    <h2 className="text-2xl font-extrabold text-[#1B2A41] uppercase tracking-wide mb-1">
                        {member.name}
                    </h2>

                    {/* Institution */}
                    {member.institution && (
                        <div className="mb-6">
                            <p className="text-xs font-bold text-[#F15A29] uppercase tracking-widest mb-1">
                                Entity / Institution Name
                            </p>
                            <p className="text-gray-700 text-sm border border-gray-200 rounded px-3 py-2 bg-gray-50">
                                {member.institution}
                            </p>
                        </div>
                    )}

                    {/* Profile Details */}
                    {member.profile_details && (
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-[#1B2A41] mb-2">Profile</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {member.profile_details}
                            </p>
                        </div>
                    )}

                    {/* Expertise & Skills */}
                    {skills.length > 0 && (
                        <div>
                            <h3 className="text-base font-extrabold text-[#1B2A41] uppercase tracking-wide mb-3">
                                Expertise &amp; Skills:
                            </h3>
                            <div className="space-y-3">
                                {skills.map((skill, idx) => (
                                    <div key={idx}>
                                        <p className="text-sm font-semibold text-gray-700 mb-1">{skill}</p>
                                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: `${75 + (idx % 3) * 8}%`,
                                                    backgroundColor: '#00A99D',
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemberProfileModal;
