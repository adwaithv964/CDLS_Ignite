import React from 'react';
import { MapPin, Mail, Phone, ArrowRight, Wifi, Wind, Zap, Users, MonitorPlay, Clock, Camera, ShieldCheck, Armchair } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CDLSPage = () => {
    return (
        <div className="bg-white min-h-screen font-sans">
            <Header />

            <main className="pt-8 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Top Buttons Section */}
                    <div className="flex flex-wrap justify-between items-center mb-12 gap-4">
                        <button className="bg-[#FF4D4D] text-white px-6 py-3 rounded text-sm font-bold tracking-wider uppercase shadow-md hover:bg-red-600 transition-colors">
                            KSUM PARTNERED
                        </button>

                        <button className="bg-gradient-to-r from-[#7B5AFF] to-[#5F3DC4] text-white px-8 py-3 rounded-full font-bold flex items-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                            Book Now <ArrowRight size={18} className="ml-2" />
                        </button>
                    </div>

                    {/* Contact Info Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="flex items-center space-x-4">
                            <div className="p-2">
                                <MapPin className="text-[#5F3DC4]" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A41]">Old Bus stand, Thamarassery</h4>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="p-2">
                                <Mail className="text-[#5F3DC4]" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A41]">info@cdlsthamarassery.in</h4>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="p-2">
                                <Phone className="text-[#5F3DC4]" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A41]">+91 8281687960</h4>
                            </div>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                        <div className="rounded-2xl overflow-hidden shadow-lg h-[20rem]">
                            <img
                                src="/assets/cdls_img_1.jpeg"
                                alt="Coworking Space 1"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-lg h-[20rem]">
                            <img
                                src="/assets/cdls_img_2.png"
                                alt="Meeting Room"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-lg h-[20rem]">
                            <img
                                src="/assets/cdls_img_3.png"
                                alt="Coworking Space 2"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Facilities Section */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A41] mb-2">
                            The Facilities And Offers Available
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

                        <FacilityCard
                            icon={Wifi}
                            title="High-speed internet"
                            bgColor="bg-blue-50"
                            iconColor="text-blue-500"
                            iconBg=""
                        />
                        <FacilityCard
                            icon={Wind}
                            title="Fully air-conditioned co-working areas"
                            bgColor="bg-red-50"
                            iconColor="text-red-500"
                            iconBg=""
                        />
                        <FacilityCard
                            icon={Zap}
                            title="24x7 Power Backup"
                            bgColor="bg-green-50"
                            iconColor="text-green-500"
                            iconBg=""
                        />

                        <FacilityCard
                            icon={Users}
                            title="Meeting Room"
                            bgColor="bg-yellow-50"
                            iconColor="text-yellow-500"
                            iconBg=""
                        />
                        <FacilityCard
                            icon={MonitorPlay}
                            title="Smart TV For Office Presentations"
                            bgColor="bg-purple-50"
                            iconColor="text-purple-500"
                            iconBg=""
                        />
                        <FacilityCard
                            icon={Clock}
                            title="24/7 Access"
                            bgColor="bg-pink-50"
                            iconColor="text-pink-500"
                            iconBg=""
                        />

                        <FacilityCard
                            icon={Camera}
                            title="CCTV surveillance"
                            bgColor="bg-indigo-50"
                            iconColor="text-indigo-500"
                            iconBg=""
                        />
                        <FacilityCard
                            icon={ShieldCheck}
                            title="Authorized access"
                            bgColor="bg-orange-50"
                            iconColor="text-orange-500"
                            iconBg=""
                        />
                        <FacilityCard
                            icon={Armchair}
                            title="33 Seating space"
                            bgColor="bg-cyan-50"
                            iconColor="text-cyan-500"
                            iconBg=""
                        />

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

const FacilityCard = ({ icon: Icon, title, bgColor, iconColor }) => (
    <div className={`${bgColor} rounded-xl p-6 flex items-center space-x-4 transition-transform hover:-translate-y-1`}>
        <div className={`p-3 rounded-full bg-white shadow-sm`}>
            <Icon className={iconColor} size={28} />
        </div>
        <h3 className="font-bold text-[#1B2A41] text-lg leading-tight">
            {title}
        </h3>
    </div>
);

export default CDLSPage;
