import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Mail,
    LogOut,
    Briefcase,
    Heart,
    Rocket,
    Rss,
    Wrench,
    UserCheck,
    Bell
} from 'lucide-react';
import api from '../../api/axios';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [unreadCount, setUnreadCount] = useState(0);

    const checkUnread = async () => {
        try {
            const res = await api.get('/core/contact/list/');
            const lastViewed = localStorage.getItem('lastViewedInquiries');
            if (!lastViewed) {
                setUnreadCount(res.data.length);
            } else {
                const count = res.data.filter(item => new Date(item.created_at) > new Date(lastViewed)).length;
                setUnreadCount(count);
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        } else {
            checkUnread();
            const interval = setInterval(checkUnread, 30000); // Check every 30s
            return () => clearInterval(interval);
        }
    }, [navigate]);

    useEffect(() => {
        if (location.pathname === '/admin/inquiries') {
            localStorage.setItem('lastViewedInquiries', new Date().toISOString());
            setUnreadCount(0);
        }
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/events', icon: <Calendar size={20} />, label: 'Events' },
        { path: '/admin/members', icon: <UserCheck size={20} />, label: 'Members' },
        { path: '/admin/interests/volunteer', icon: <Heart size={20} />, label: 'Volunteers' },
        { path: '/admin/interests/coworker', icon: <Users size={20} />, label: 'Co-workers' },
        { path: '/admin/interests/startup', icon: <Briefcase size={20} />, label: 'Startups' },
        { path: '/admin/community-events', icon: <Rocket size={20} />, label: 'Community Events' },
        { path: '/admin/inquiries', icon: <Mail size={20} />, label: 'Inquiries' },
        { path: '/admin/subscribers', icon: <Rss size={20} />, label: 'Subscribers' },
        { path: '/admin/maintenance', icon: <Wrench size={20} />, label: 'Maintenance' },
    ];

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold tracking-wider text-teal-400">CDLS ADMIN</h2>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${location.pathname === item.path
                                        ? 'bg-teal-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                        }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-red-900/50 rounded transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto flex flex-col relative">
                {/* Header for Notifications */}
                <div className="flex justify-end items-center px-8 py-4 bg-transparent">
                    <Link to="/admin/inquiries" className="relative p-2 text-gray-500 hover:text-gray-800 transition-colors" title="Notifications">
                        <Bell size={24} />
                        {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-gray-100">
                                {unreadCount > 99 ? '99+' : unreadCount}
                            </span>
                        )}
                    </Link>
                </div>

                <div className="px-8 pb-8 flex-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
