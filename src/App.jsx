import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MaintenanceProvider } from './context/MaintenanceContext';
import HomePage from './Pages/HomePage';
import EventsPage from './Pages/EventsPage';
import Members from './Pages/Members';
import Community from './Pages/Community';
import CDLSPage from './Pages/CDLSPage';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';

import AdminLogin from './Pages/Admin/AdminLogin';
import AdminLayout from './Pages/Admin/AdminLayout';
import Dashboard from './Pages/Admin/Dashboard';
import EventsManager from './Pages/Admin/EventsManager';
import CommunityEventsManager from './Pages/Admin/CommunityEventsManager';
import InterestsManager from './Pages/Admin/InterestsManager';
import InquiriesManager from './Pages/Admin/InquiriesManager';
import SubscribersManager from './Pages/Admin/SubscribersManager';
import MaintenanceManager from './Pages/Admin/MaintenanceManager';
import MembersManager from './Pages/Admin/MembersManager';
import SiteStatsManager from './Pages/Admin/SiteStatsManager';

function App() {
    return (
        <MaintenanceProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <ScrollToTop />
                <ScrollToTopButton />
                <div className="min-h-screen bg-white font-sans">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/members" element={<Members />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/cdls" element={<CDLSPage />} />

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="events" element={<EventsManager />} />
                            <Route path="community-events" element={<CommunityEventsManager />} />
                            <Route path="interests/:category" element={<InterestsManager />} />
                            <Route path="inquiries" element={<InquiriesManager />} />
                            <Route path="subscribers" element={<SubscribersManager />} />
                            <Route path="maintenance" element={<MaintenanceManager />} />
                            <Route path="members" element={<MembersManager />} />
                            <Route path="site-stats" element={<SiteStatsManager />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </MaintenanceProvider>
    );
}

export default App;
