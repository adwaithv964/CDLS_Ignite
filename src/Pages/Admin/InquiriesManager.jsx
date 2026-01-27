import React, { useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import api from '../../api/axios';

const InquiriesManager = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get('/core/contact/list/');
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
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Message', key: 'message' },
        { label: 'Date', key: 'created_at', render: (row) => new Date(row.created_at).toLocaleDateString() },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact Inquiries</h1>
            <DataTable
                columns={columns}
                data={data}
                isLoading={loading}
            />
        </div>
    );
};

export default InquiriesManager;
