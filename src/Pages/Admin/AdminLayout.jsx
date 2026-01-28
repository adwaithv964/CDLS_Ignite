import React, { useEffect } from 'react';
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
    Rss
} from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('adminToken'); // Changed to adminToken
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken'); // Changed to adminToken
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/events', icon: <Calendar size={20} />, label: 'Events' },
        { path: '/admin/interests/volunteer', icon: <Heart size={20} />, label: 'Volunteers' },
        { path: '/admin/interests/coworker', icon: <Users size={20} />, label: 'Co-workers' },
        { path: '/admin/interests/startup', icon: <Briefcase size={20} />, label: 'Startups' },
        { path: '/admin/community-events', icon: <Rocket size={20} />, label: 'Community Events' },
        { path: '/admin/inquiries', icon: <Mail size={20} />, label: 'Inquiries' },
        { path: '/admin/subscribers', icon: <Rss size={20} />, label: 'Subscribers' },
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
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
