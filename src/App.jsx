import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import EventsPage from './Pages/EventsPage';
import Members from './Pages/Members';
import Community from './Pages/Community';
import Register from './components/Register';
import Login from './components/Login';
import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-white font-sans">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/members" element={<Members />} />
                    <Route path="/community" element={<Community />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
