import React, { useState } from 'react';
import { X } from 'lucide-react';
import api from '../../../api/axios';

const AddEventModal = ({ onClose, onSuccess, event = null }) => {
    const [formData, setFormData] = useState({
        title: event?.title || '',
        type: event?.type || 'Beginners',
        type_color: event?.type_color || 'bg-purple-500',
        date: event?.date || '',
        time: event?.time || '',
        location: event?.location || 'CDLS Office',
        author: event?.author || '',
        dept: event?.dept || '',
        status: event?.status || 'Open',
        image: null,
        image_color: event?.image_color || 'bg-blue-100',
        registrations: event?.registrations || 0,
        is_open: event?.is_open !== undefined ? event.is_open : true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const data = new FormData();

        // Auto-update status based on Date AND Time
        let currentStatus = formData.status;
        if (formData.date && formData.time) {
            const dateStr = formData.date; // YYYY-MM-DD
            const timeStr = formData.time; // HH:mm
            const sessionDateTime = new Date(`${dateStr}T${timeStr}`);
            const now = new Date();

            if (sessionDateTime > now) {
                currentStatus = 'Open';
            } else {
                currentStatus = 'Closed';
            }
        } else if (formData.date) {
            // Fallback if no time is provided
            const selectedDate = new Date(formData.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate >= today) {
                currentStatus = 'Open';
            } else {
                currentStatus = 'Closed';
            }
        }

        Object.keys(formData).forEach(key => {
            // specific check for image: only append if it's a file (new upload)
            if (key === 'image') {
                if (formData[key] instanceof File) {
                    data.append(key, formData[key]);
                }
            } else if (key === 'status') {
                data.append(key, currentStatus);
            } else if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });

        try {
            if (event) {
                await api.patch(`/events/${event.id}/`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await api.post('/events/', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Failed to save event", err);
            setError('Failed to save event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">{event ? 'Edit Event' : 'Add New Event'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="w-full border rounded px-3 py-2">
                                <option value="Beginners">Beginners</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Hands-on">Hands-on</option>
                                <option value="Workshop">Workshop</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Organizer (Author)</label>
                            <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <input type="text" name="dept" value={formData.dept} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full border rounded px-3 py-2">
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                        {event?.image && (
                            <div className="mb-2">
                                <span className="text-xs text-gray-500">Current image: {event.image}</span>
                            </div>
                        )}
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/png, image/jpeg, image/jpg"
                            className="w-full border rounded px-3 py-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">Accepted formats: PNG, JPG, JPEG</p>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button type="button" onClick={onClose} className="mr-3 px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                        <button type="submit" disabled={loading} className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded font-medium disabled:opacity-50">
                            {loading ? 'Saving...' : (event ? 'Update Event' : 'Create Event')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEventModal;
