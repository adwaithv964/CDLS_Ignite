import React from 'react';
import { Edit, Trash2, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const DataTable = ({ columns, data, onEdit, onDelete, isLoading }) => {
    const downloadExcel = () => {
        if (!data || data.length === 0) return;

        // Prepare data for export
        const exportData = data.map(row => {
            const rowData = {};
            columns.forEach(col => {
                // Use render function result if available, otherwise raw value
                // For simplified export, we might prioritize raw values or strings
                let value = row[col.key];

                // Special handling for clean export if render is complex, 
                // but usually for Excel we want the raw data or a simple string representation.
                // If col.key is 'phone', ensure it's treated as string to avoid scientific notation
                if (col.key === 'phone') {
                    // Ensure it's a string
                    value = String(value);
                }

                rowData[col.label] = value;
            });
            return rowData;
        });

        const worksheet = XLSX.utils.json_to_sheet(exportData);

        // precise column width calculation could be improved, but setting a default width helps
        const colWidths = columns.map(col => ({ wch: 25 }));
        worksheet['!cols'] = colWidths;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

        XLSX.writeFile(workbook, "data_export.xlsx");
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
                    onClick={downloadExcel}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded shadow transition-colors flex items-center gap-2"
                >
                    <Download size={18} />
                    Download Excel
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
