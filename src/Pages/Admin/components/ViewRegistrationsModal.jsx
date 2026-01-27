import React, { useEffect, useState } from 'react';
import { X, User, Phone, Mail, Calendar, Download } from 'lucide-react';
import api from '../../../api/axios';

const ViewRegistrationsModal = ({ event, onClose }) => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const response = await api.get(`/events/registrations/${event.id}/`);
                setRegistrations(response.data);
            } catch (error) {
                console.error("Failed to fetch registrations", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRegistrations();
    }, [event.id]);

    const downloadCSV = () => {
        if (!registrations.length) return;

        const headers = ["Name", "Email", "Phone", "Registered At"];
        const csvRows = [headers.join(",")];

        registrations.forEach(reg => {
            const row = [
                `"${reg.name}"`,
                `"${reg.email}"`,
                `"${reg.phone}"`,
                `"${new Date(reg.registered_at).toLocaleDateString()}"`
            ];
            csvRows.push(row.join(","));
        });

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `registrations-${event.title.replace(/\s+/g, '_')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Registrations</h2>
                        <p className="text-sm text-gray-500">For: {event.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {registrations.length > 0 && (
                            <button
                                onClick={downloadCSV}
                                className="flex items-center gap-1 text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 transition-colors"
                            >
                                <Download size={16} /> Download CSV
                            </button>
                        )}
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto flex-grow p-6">
                    {loading ? (
                        <div className="text-center py-10 text-gray-500">Loading registrations...</div>
                    ) : registrations.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">No registrations found for this event.</div>
                    ) : (
                        <div className="space-y-4">
                            {registrations.map((reg) => (
                                <div key={reg.id} className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between border border-gray-100">
                                    <div className="flex items-center space-x-4 mb-3 md:mb-0">
                                        <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-bold">
                                            {reg.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                                {reg.name}
                                            </h3>
                                            <div className="text-sm text-gray-500 flex items-center gap-3">
                                                <span className="flex items-center gap-1"><Mail size={12} /> {reg.email}</span>
                                                <span className="flex items-center gap-1"><Phone size={12} /> {reg.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400 flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(reg.registered_at).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t bg-gray-50 text-right text-gray-500 text-sm">
                    Total Registrations: {registrations.length}
                </div>
            </div>
        </div>
    );
};

export default ViewRegistrationsModal;
