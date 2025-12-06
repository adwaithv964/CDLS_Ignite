import React from 'react';
import Header from '../../components/Header';
import Hero from './components/Hero';
import CoWorks from './components/CoWorks';
import SkillDevelopment from './components/SkillDevelopment';
import Volunteer from './components/Volunteer';
import Facilities from './components/Facilities';
import StartupNetwork from './components/StartupNetwork';
import InsightsFeedback from './components/InsightsFeedback';
import Events from './components/Events';
import AdvisoryPanel from './components/AdvisoryPanel';
import ContactSection from '../../components/ContactSection';
import Footer from '../../components/Footer';

const HomePage = () => (
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

export default HomePage;
