import React, { useState } from 'react';
import { FileText, X, Calendar, Clock } from 'lucide-react';
import api from '../../../api/axios';

const HostEventForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        event_title: '',
        organizer_details: '',
        purpose: '',
        date: '',
        time: '',
        duration: '',
        participants_count: '',
        details: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await api.post('/events/host/', formData);
            setStatus('success');
            setFormData({
                name: '', email: '', phone: '', event_title: '',
                organizer_details: '', purpose: '', date: '', time: '',
                duration: '', participants_count: '', details: ''
            });
            setTimeout(() => {
                if (onClose) onClose();
                setStatus('');
            }, 2000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };
    return (
        <div className="bg-[#0B2136] relative overflow-hidden p-8 md:p-12 rounded-lg max-w-4xl w-full text-white shadow-2xl my-8">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundSize: '100px 100px'
            }}></div>

            {/* Close button */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-20"
                >
                    <X size={24} />
                </button>
            )}

            <div className="relative z-10 w-full">
                {/* Modal header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <FileText size={18} className="text-[#00D2AA]" />
                        <span className="text-[#00D2AA] font-semibold tracking-wider uppercase">Contact Us</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Are You An Interested Individual?
                    </h2>
                </div>

                {/* Event form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {status === 'success' && <div className="text-[#00D2AA] text-center font-bold">Request submitted successfully!</div>}
                    {status === 'error' && <div className="text-red-500 text-center font-bold">Failed to submit request. Please try again.</div>}

                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full bg-white text-gray-800 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00D2AA]"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full bg-white text-gray-800 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00D2AA]"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        className="w-full bg-white text-gray-800 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00D2AA]"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    {/* Event details */}
                    <input
                        type="text"
                        name="event_title"
                        placeholder="Event Title"
                        className="w-full bg-white text-gray-800 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00D2AA]"
                        value={formData.event_title}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="organizer_details"
                        placeholder="Organizer Details"
                        className="w-full bg-white text-gray-800 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00D2AA]"
                        value={formData.organizer_details}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="purpose"
                        placeholder="Purpose / Objective"
                        className="w-full bg-white text-gray-800 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00D2AA]"
                        value={formData.purpose}
                        onChange={handleChange}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                name="date"
                                placeholder="Date"
                                onFocus={(e) => e.target.type = 'date'}
                                onBlur={(e) => e.target.type = 'text'}
                                className="w-full bg-white text-gray-800 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00D2AA] appearance-none"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                            <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                name="time"
                                placeholder="Time"
                                onFocus={(e) => e.target.type = 'time'}
                                onBlur={(e) => e.target.type = 'text'}
                                className="w-full bg-white text-gray-800 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00D2AA] appearance-none"
                                value={formData.time}
                                onChange={handleChange}
                                required
                            />
                            <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>
                    </div>

                    <input
                        type="text"
                        name="duration"
                        placeholder="Duration"
                        className="w-full bg-white text-gray-800 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00D2AA]"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="participants_count"
                        placeholder="No of Participants"
                        className="w-full bg-white text-gray-800 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00D2AA]"
                        value={formData.participants_count}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="details"
                        placeholder="Event Details.."
                        rows="4"
                        className="w-full bg-white text-gray-800 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00D2AA] resize-none"
                        value={formData.details}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="bg-[#00D2AA] hover:bg-teal-500 text-white font-bold py-3 px-8 rounded flex items-center transition-colors uppercase tracking-wide disabled:opacity-50"
                        >
                            {status === 'sending' ? 'Submitting...' : 'Submit Now'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HostEventForm;
