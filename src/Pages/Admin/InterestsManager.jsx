import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DataTable from './components/DataTable';
import api from '../../api/axios';

const InterestsManager = () => {
    const { category } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInterests = async () => {
        setLoading(true);
        try {
            const response = await api.get('/core/interest/list/', {
                params: { category: category }
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInterests();
    }, [category]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this record?')) return;
        try {
            await api.delete(`/core/interest/delete/${id}/`);
            fetchInterests(); // Refresh data
        } catch (error) {
            console.error("Failed to delete:", error);
            alert("Failed to delete record");
        }
    };

    const columns = [
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
        { label: 'Message', key: 'message' },
        { label: 'Date', key: 'created_at', render: (row) => new Date(row.created_at).toLocaleDateString() },
    ];

    const titleMap = {
        volunteer: 'Volunteer Applications',
        coworker: 'Co-worker Applications',
        startup: 'Startup Network Interests',
        general: 'General Interests'
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">{titleMap[category] || 'Interests'}</h1>
                <button
                    onClick={fetchInterests}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded transition-colors"
                >
                    Refresh
                </button>
            </div>
            <DataTable
                columns={columns}
                data={data}
                isLoading={loading}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default InterestsManager;
