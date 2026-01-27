import React from 'react';

const Dashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Events', value: '12', color: 'bg-blue-500' },
                    { label: 'Active Members', value: '48', color: 'bg-green-500' },
                    { label: 'Pending Requests', value: '5', color: 'bg-orange-500' },
                    { label: 'Subscribers', value: '128', color: 'bg-purple-500' },
                ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-6 border-l-4 border-transparent hover:border-teal-500 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</h3>
                            <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-white rounded-lg shadow p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                <div className="text-gray-500 italic">No recent activity to display.</div>
            </div>
        </div>
    );
};

export default Dashboard;
