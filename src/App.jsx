import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import EventsPage from './Pages/EventsPage';
import Members from './Pages/Members';
import Community from './Pages/Community';
import CDLSPage from './Pages/CDLSPage';
import Register from './components/Register';
import Login from './components/Login';
import ScrollToTop from './components/ScrollToTop';

import AdminLogin from './Pages/Admin/AdminLogin';
import AdminLayout from './Pages/Admin/AdminLayout';
import Dashboard from './Pages/Admin/Dashboard';
import EventsManager from './Pages/Admin/EventsManager';
import CommunityEventsManager from './Pages/Admin/CommunityEventsManager';
import InterestsManager from './Pages/Admin/InterestsManager';
import InquiriesManager from './Pages/Admin/InquiriesManager';
import SubscribersManager from './Pages/Admin/SubscribersManager';

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            <div className="min-h-screen bg-white font-sans">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
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
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
