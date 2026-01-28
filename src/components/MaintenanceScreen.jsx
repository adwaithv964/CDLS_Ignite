import React from 'react';
import { Construction, Clock, Wrench, ArrowRight, Users, Grip } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const MaintenanceScreen = ({
    pageName = "This Page",
    message = "We're currently upgrading this section to serve you better!",
    estimatedReturn = null
}) => {
    return (
        <div className="font-sans text-gray-800 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow w-full flex items-center justify-center px-4 py-16">
                <div className="max-w-2xl w-full text-center">
                    {/* Animated Construction Icon */}
                    <div className="mb-8 relative animate-bounce">
                        <div className="inline-block p-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full shadow-2xl">
                            <Construction size={80} className="text-[#F15A29]" strokeWidth={1.5} />
                        </div>
                        {/* Rotating Wrench */}
                        <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-full shadow-lg animate-spin" style={{ animationDuration: '3s' }}>
                            <Wrench size={24} className="text-[#1B2A41]" />
                        </div>
                    </div>

                    {/* Main Message */}
                    <h1 className="text-5xl font-bold text-[#1B2A41] mb-4">
                        Under Maintenance
                    </h1>

                    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                        {message}
                    </p>

                    {/* Info Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-[#F15A29]">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Clock size={24} className="text-[#F15A29]" />
                            <h2 className="text-lg font-semibold text-[#1B2A41]">Expected Return</h2>
                        </div>
                        <p className="text-3xl font-bold text-[#F15A29] mb-2">
                            {estimatedReturn ? new Date(estimatedReturn).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                            }) : 'Soon'}
                        </p>
                        <p className="text-gray-500 text-sm">
                            Our team is working hard to enhance your experience
                        </p>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                            <div className="bg-blue-500 p-2 rounded-lg mt-1">
                                <Users size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#1B2A41] mb-1">What's Coming?</h3>
                                <p className="text-sm text-gray-600">
                                    Enhanced features, better performance, and improved user experience
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                            <div className="bg-green-500 p-2 rounded-lg mt-1">
                                <Grip size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#1B2A41] mb-1">Stay Connected</h3>
                                <p className="text-sm text-gray-600">
                                    Follow us on social media for real-time updates and announcements
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Return Home Button */}
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 bg-[#F15A29] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        <ArrowRight size={20} className="rotate-180" />
                        Return to Homepage
                    </a>

                    {/* Progress Dots */}
                    <div className="mt-12 flex justify-center gap-2">
                        <div className="w-3 h-3 bg-[#F15A29] rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-[#F15A29] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-3 h-3 bg-[#F15A29] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MaintenanceScreen;
