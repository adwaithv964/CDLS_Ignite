import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import api from '../../../api/axios';

const MemberProfileModal = ({ member, onClose }) => {
    const [showContactForm, setShowContactForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
    const [status, setStatus] = useState('');

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
                        <button
                            onClick={() => setShowContactForm(true)}
                            className="mt-6 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all shadow-md w-full justify-center"
                        >
                            Contact <ArrowRight size={16} />
                        </button>
                    )}
                </div>

                {/* Right Panel */}
                <div className={`flex-1 p-8 overflow-y-auto ${showContactForm ? 'bg-[#F7F8FA]' : 'bg-white'}`}>
                    {!showContactForm ? (
                        <>
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
                                    <div className="flex flex-col gap-3">
                                        {skills.map((skill, idx) => (
                                            <React.Fragment key={idx}>
                                                <p className="text-sm font-semibold text-gray-700">{skill}</p>
                                                {idx < skills.length - 1 && (
                                                    <div className="w-full h-1.5 bg-gray-200 rounded-full" />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="h-full flex flex-col">
                            <h2 className="text-xl font-extrabold text-[#1B2A41] uppercase tracking-wide mb-1">
                                CONTACT REQUEST
                            </h2>
                            <p className="text-xs font-semibold text-gray-600 mb-8">
                                Enter Your Details To Get Contact Information
                            </p>

                            {status === 'success' ? (
                                <div className="bg-green-50 text-green-600 p-4 rounded-lg border border-green-200 font-medium">
                                    Your request has been submitted. Our team will contact you soon.
                                </div>
                            ) : (
                                <form 
                                    className="flex-1 flex flex-col space-y-5"
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        setStatus('sending');
                                        try {
                                            await api.post('/core/contact/', {
                                                name: formData.name,
                                                email: formData.email,
                                                message: `Contact Request for Member: ${member.name}\nMember Email: ${member.email}\nRequester Mobile: ${formData.phone}`
                                            });
                                            setStatus('success');
                                            setTimeout(() => {
                                                setShowContactForm(false);
                                                setStatus('');
                                                setFormData({ name: '', phone: '', email: '' });
                                            }, 4000);
                                        } catch (error) {
                                            console.error(error);
                                            setStatus('error');
                                        }
                                    }}
                                >
                                    {status === 'error' && (
                                        <div className="text-red-500 text-sm">Failed to submit request. Please try again.</div>
                                    )}
                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1B2A41] mb-2">Your Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#1B2A41] mb-2">Mobile Number *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#1B2A41] mb-2">Email ID *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                                        />
                                    </div>

                                    <div className="mt-8 pt-4 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowContactForm(false)}
                                            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold transition"
                                        >
                                            CANCEL
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={status === 'sending'}
                                            className="px-8 py-3 bg-[#7b61ff] hover:bg-[#6a50eb] text-white text-sm font-semibold transition disabled:opacity-70"
                                        >
                                            {status === 'sending' ? 'SUBMITTING...' : 'SUBMIT'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemberProfileModal;
