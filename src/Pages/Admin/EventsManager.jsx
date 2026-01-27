import React, { useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import api from '../../api/axios';
import AddEventModal from './components/AddEventModal';
import ViewRegistrationsModal from './components/ViewRegistrationsModal';
import { Users, Edit } from 'lucide-react';

const EventsManager = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [viewRegistrationsEvent, setViewRegistrationsEvent] = useState(null);
    const [editingEvent, setEditingEvent] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get('/events/'); // This endpoint exists and returns list
            setData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await api.delete(`/events/${id}/`);
            fetchData();
        } catch (error) {
            console.error("Failed to delete event:", error);
            alert("Failed to delete event");
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setShowAddModal(true);
    };

    const columns = [
        { label: 'Title', key: 'title' },
        { label: 'Type', key: 'type' },
        { label: 'Date', key: 'date' },
        { label: 'Organizer', key: 'author' },
        { label: 'Status', key: 'status' },
        {
            label: 'Actions',
            key: 'actions',
            render: (row) => (
                <div className="flex items-center">
                    <button
                        onClick={() => handleEdit(row)}
                        className="text-blue-600 hover:text-blue-800 mr-2 flex items-center gap-1 text-sm bg-blue-50 px-2 py-1 rounded"
                        title="Edit Event"
                    >
                        <Edit size={16} /> Edit
                    </button>
                    <button
                        onClick={() => setViewRegistrationsEvent(row)}
                        className="text-teal-600 hover:text-teal-800 mr-2 flex items-center gap-1 text-sm bg-teal-50 px-2 py-1 rounded"
                        title="View Registrations"
                    >
                        <Users size={16} /> View Reg.
                    </button>
                </div>
            )
        }
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Events Management</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded transition-colors"
                >
                    + Add New Event
                </button>
            </div>

            <DataTable
                columns={columns}
                data={data}
                isLoading={loading}
                onDelete={handleDelete}
            // onEdit/onDelete to be implemented later or now if time permits
            />

            {showAddModal && (
                <AddEventModal
                    event={editingEvent}
                    onClose={() => {
                        setShowAddModal(false);
                        setEditingEvent(null);
                    }}
                    onSuccess={fetchData}
                />
            )}

            {viewRegistrationsEvent && (
                <ViewRegistrationsModal
                    event={viewRegistrationsEvent}
                    onClose={() => setViewRegistrationsEvent(null)}
                />
            )}
        </div>
    );
};

export default EventsManager;
