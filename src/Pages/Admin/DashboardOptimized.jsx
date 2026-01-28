import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const DashboardOptimized = () => {
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
        const fetchDashboardData = async (retryCount = 0) => {
            const maxRetries = 3;
            const baseDelay = 2000; // 2 seconds

            try {
                setError(null);

                // Show informative message if it's taking time
                if (retryCount > 0) {
                    setError(`Waking up backend server... (Attempt ${retryCount + 1}/${maxRetries + 1})`);
                }

                // Single optimized API call with extended timeout
                const response = await api.get('/core/dashboard/stats/', {
                    timeout: 90000 // 90 seconds for cold starts
                });

                const { stats: statsData, recent_activity } = response.data;

                // Update stats cards
                setStats([
                    { label: 'Event Requests', value: statsData.total_events, color: 'bg-blue-500' },
                    { label: 'Interested Members', value: statsData.active_members, color: 'bg-green-500' },
                    { label: 'Contact Inquiries', value: statsData.pending_requests, color: 'bg-orange-500' },
                    { label: 'Subscribers', value: statsData.subscribers, color: 'bg-purple-500' },
                ]);

                // Process recent activity
                const activities = recent_activity.map(activity => ({
                    ...activity,
                    date: new Date(activity.created_at)
                }));

                setRecentActivity(activities);
                setError(null); // Clear any error messages on success

            } catch (err) {
                console.error("Error fetching dashboard stats:", err);

                // Check if it's a timeout error and we can retry
                const isTimeout = err.code === 'ECONNABORTED' || err.message?.includes('timeout');

                if (isTimeout && retryCount < maxRetries) {
                    // Exponential backoff: 2s, 4s, 8s
                    const delay = baseDelay * Math.pow(2, retryCount);
                    setError(`Backend is waking up (free tier hosting)... Retrying in ${delay / 1000}s...`);

                    setTimeout(() => {
                        fetchDashboardData(retryCount + 1);
                    }, delay);
                } else {
                    // Final error - no more retries
                    if (isTimeout) {
                        setError(
                            "Backend server is taking too long to respond. This can happen with free-tier hosting. " +
                            "Please wait a moment and refresh the page, or contact support if the issue persists."
                        );
                    } else {
                        setError(err.response?.data?.error || err.message || "Failed to load dashboard data");
                    }
                    setLoading(false);
                }
            } finally {
                if (retryCount === 0 || retryCount >= maxRetries) {
                    setLoading(false);
                }
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
            {error && (
                <div className={`border px-4 py-3 rounded mb-4 ${error.includes('Waking up') || error.includes('Retrying')
                        ? 'bg-blue-100 border-blue-400 text-blue-700'
                        : 'bg-red-100 border-red-400 text-red-700'
                    }`} role="alert">
                    <strong className="font-bold">
                        {error.includes('Waking up') || error.includes('Retrying') ? 'Loading: ' : 'Error: '}
                    </strong>
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
                            <div key={activity._id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className={`mr-4 mt-1 font-bold text-sm ${activity.color} uppercase w-32 flex-shrink-0`}>
                                    {activity.type}
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-800">{activity.description}</p>
                                    <span className="text-xs text-gray-400">
                                        {activity.date ? activity.date.toLocaleString() : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardOptimized;
