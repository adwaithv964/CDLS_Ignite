import React, { useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import api from '../../api/axios';

const SubscribersManager = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get('/core/subscribers/list/');
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
        if (!window.confirm('Are you sure you want to delete this subscriber?')) return;
        try {
            await api.delete(`/core/subscribe/delete/${id}/`);
            fetchData();
        } catch (error) {
            console.error("Failed to delete:", error);
            alert("Failed to delete record");
        }
    };

    const columns = [
        { label: 'Email', key: 'email' },
        { label: 'Subscribed At', key: 'created_at', render: (row) => new Date(row.created_at).toLocaleDateString() },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Newsletter Subscribers</h1>
            <DataTable
                columns={columns}
                data={data}
                isLoading={loading}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default SubscribersManager;
