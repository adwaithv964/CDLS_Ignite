import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import CoWorks from './components/CoWorks';
import SkillDevelopment from './components/SkillDevelopment';
import Volunteer from './components/Volunteer';
import Facilities from './components/Facilities';
import StartupNetwork from './components/StartupNetwork';
import InsightsFeedback from './components/InsightsFeedback';
import Events from './components/Events';
import AdvisoryPanel from './components/AdvisoryPanel';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import EventsPage from './components/EventsPage';

const Home = () => (
    <>
        <Header />
        <Hero />
        <CoWorks />
        <SkillDevelopment />
        <Volunteer />
        <Facilities />
        <StartupNetwork />
        <InsightsFeedback />
        <Events />
        <AdvisoryPanel />
        <ContactSection />
        <div className="h-24 bg-white"></div>
        <Footer />
    </>
);

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white font-sans">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/events" element={<EventsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
