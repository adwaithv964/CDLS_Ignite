import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const Dashboard = () => {
    const [stats, setStats] = useState([
        { label: 'Total Events', value: '...', color: 'bg-blue-500' },
        { label: 'Active Members', value: '...', color: 'bg-green-500' },
        { label: 'Pending Requests', value: '...', color: 'bg-orange-500' },
        { label: 'Subscribers', value: '...', color: 'bg-purple-500' },
    ]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setError(null);
                // Fetch counts from list endpoints (inefficient but functional for MVP)
                const [eventsRes, interestsRes, inquiriesRes, subscribersRes] = await Promise.all([
                    api.get('/events/host/list/'),
                    api.get('/core/interest/list/'), // Gets all interests
                    api.get('/core/contact/list/'),
                    api.get('/core/subscribers/list/')
                ]);

                // Calculate counts
                const totalEvents = eventsRes.data.length; // Host Requests
                // Filter interests for "coworker" (Members) vs others if needed, using all for now
                const activeMembers = interestsRes.data.filter(i => i.category === 'coworker' || i.category === 'startup').length;
                const pendingRequests = inquiriesRes.data.length; // Contact inputs
                const subscribers = subscribersRes.data.length;

                setStats([
                    { label: 'Event Requests', value: totalEvents, color: 'bg-blue-500' },
                    { label: 'Interested Members', value: activeMembers, color: 'bg-green-500' },
                    { label: 'Contact Inquiries', value: pendingRequests, color: 'bg-orange-500' },
                    { label: 'Subscribers', value: subscribers, color: 'bg-purple-500' },
                ]);

                // Normalize and Aggregate Recent Activity
                const activities = [];

                // Helper to format date safely
                const getDate = (dateStr) => new Date(dateStr);

                // 1. Host Events
                eventsRes.data.forEach(item => {
                    activities.push({
                        id: item._id,
                        type: 'Event Request',
                        description: `New event request: "${item.event_title}" by ${item.name}`,
                        date: getDate(item.created_at),
                        color: 'text-blue-500'
                    });
                });

                // 2. Interests
                interestsRes.data.forEach(item => {
                    activities.push({
                        id: item._id,
                        type: 'Interest',
                        description: `New ${item.category} interest from ${item.name}`,
                        date: getDate(item.created_at),
                        color: 'text-green-500'
                    });
                });

                // 3. Inquiries
                inquiriesRes.data.forEach(item => {
                    activities.push({
                        id: item._id,
                        type: 'Inquiry',
                        description: `New inquiry from ${item.name}: "${item.message.substring(0, 30)}..."`,
                        date: getDate(item.created_at),
                        color: 'text-orange-500'
                    });
                });

                // 4. Subscribers
                subscribersRes.data.forEach(item => {
                    activities.push({
                        id: item._id,
                        type: 'Subscriber',
                        description: `New subscriber: ${item.email}`,
                        date: getDate(item.created_at),
                        color: 'text-purple-500'
                    });
                });

                // Sort by date descending
                activities.sort((a, b) => b.date - a.date);

                // Take top 5 or 10
                setRecentActivity(activities.slice(0, 10));

            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
                setError(err.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-6 border-l-4 border-transparent hover:border-teal-500 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</h3>
                            <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">
                            {loading ? <span className="text-sm text-gray-400">Loading...</span> : stat.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-white rounded-lg shadow p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                {recentActivity.length === 0 ? (
                    <div className="text-gray-500 italic">No recent activity to display.</div>
                ) : (
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className={`mr-4 mt-1 font-bold text-sm ${activity.color} uppercase w-32 flex-shrink-0`}>
                                    {activity.type}
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-800">{activity.description}</p>
                                    <span className="text-xs text-gray-400">{activity.date.toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
