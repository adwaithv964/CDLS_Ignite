import React, { useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import api from '../../api/axios';

const EventsManager = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const columns = [
        { label: 'Title', key: 'title' },
        { label: 'Type', key: 'type' },
        { label: 'Date', key: 'date' },
        { label: 'Organizer', key: 'author' },
        { label: 'Status', key: 'status' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Events Management</h1>
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded transition-colors">
                    + Add New Event
                </button>
            </div>
            <DataTable
                columns={columns}
                data={data}
                isLoading={loading}
            // onEdit/onDelete to be implemented later or now if time permits
            />
        </div>
    );
};

export default EventsManager;
