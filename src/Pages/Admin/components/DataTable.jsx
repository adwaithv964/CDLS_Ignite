import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const DataTable = ({ columns, data, onEdit, onDelete, isLoading }) => {
    const downloadCSV = () => {
        if (!data || data.length === 0) return;

        const headers = columns.map(col => col.label).join(',');
        const rows = data.map(row => {
            return columns.map(col => {
                let cell = col.render ? col.render(row) : row[col.key];
                // Handle commas or quotes in data
                cell = cell ? String(cell).replace(/"/g, '""') : '';
                return `"${cell}"`;
            }).join(',');
        }).join('\n');

        const csvContent = `${headers}\n${rows}`;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'data_export.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading data...</div>;
    }

    if (!data || data.length === 0) {
        return <div className="p-8 text-center text-gray-500">No records found.</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-end">
                <button
                    onClick={downloadCSV}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded shadow transition-colors flex items-center gap-2"
                >
                    Download CSV
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                            {columns.map((col) => (
                                <th key={col.key || col.label} className="px-6 py-4">
                                    {col.label}
                                </th>
                            ))}
                            {(onEdit || onDelete) && <th className="px-6 py-4 text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                        {data.map((item, index) => (
                            <tr key={item.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                {columns.map((col) => (
                                    <td key={col.key || col.label} className="px-6 py-4">
                                        {col.render ? col.render(item) : item[col.key]}
                                    </td>
                                ))}
                                {(onEdit || onDelete) && (
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            {onEdit && (
                                                <button
                                                    onClick={() => onEdit(item)}
                                                    className="text-blue-500 hover:text-blue-700 transition-colors"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                            )}
                                            {onDelete && (
                                                <button
                                                    onClick={() => onDelete(item._id || item.id)}
                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
