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
    Bell,
    Menu,
    X,
    BarChart3
} from 'lucide-react';
import api from '../../api/axios';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [unreadCount, setUnreadCount] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        { path: '/admin/inquiries', icon: <Mail size={20} />, label: 'Contact Inquiries' },
        { path: '/admin/subscribers', icon: <Rss size={20} />, label: 'Subscribers' },
        { path: '/admin/maintenance', icon: <Wrench size={20} />, label: 'Maintenance' },
        { path: '/admin/site-stats', icon: <BarChart3 size={20} />, label: 'Site Stats' },
    ];

    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white flex flex-col flex-shrink-0 transform transition-transform duration-200 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold tracking-wider text-teal-400">CDLS ADMIN</h2>
                    <button 
                        className="md:hidden text-gray-400 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
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
            <main className="flex-1 flex flex-col h-full relative w-full overflow-hidden">
                {/* Header for Notifications & Mobile Menu */}
                <div className="flex justify-between items-center px-4 md:px-8 py-3 bg-white/80 backdrop-blur-md border-b md:border-transparent z-10 sticky top-0 shadow-sm md:shadow-none">
                    <div className="flex items-center md:hidden">
                        <button 
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 focus:outline-none rounded-lg"
                        >
                            <Menu size={24} />
                        </button>
                        <span className="ml-2 font-bold text-slate-800 tracking-wide">CDLS ADMIN</span>
                    </div>

                    {/* Spacer for mobile to push bell to right */}
                    <div className="flex-1"></div>

                    <Link to="/admin/inquiries" className="relative p-2 text-gray-500 hover:text-gray-800 transition-colors" title="Notifications">
                        <Bell size={24} />
                        {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white md:border-gray-50">
                                {unreadCount > 99 ? '99+' : unreadCount}
                            </span>
                        )}
                    </Link>
                </div>

                <div className="px-4 md:px-8 pb-8 flex-1 overflow-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
