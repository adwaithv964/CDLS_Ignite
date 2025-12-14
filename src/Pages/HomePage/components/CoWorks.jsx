import React from 'react';
import { ArrowRight, ChevronRight, Gem } from 'lucide-react';
import InterestedIndividualForm from '../../Members/components/InterestedIndividualForm';

const CoWorks = () => {
    const [showForm, setShowForm] = React.useState(false);

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Visual showcase section */}
                    <div className="w-full lg:w-1/2 relative min-h-[400px] md:min-h-[500px] order-2 lg:order-1">

                        {/* Decorative elements */}
                        <div className="absolute -top-10 -left-10 z-0">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="text-[#00D2AA]">
                                <path d="M10 10L30 50L50 10H10Z" fill="currentColor" fillOpacity="0.2" />
                                <path d="M0 20L20 60L40 20H0Z" fill="currentColor" />
                            </svg>
                        </div>

                        {/* Primary image */}
                        <div className="absolute top-0 left-0 w-64 h-96 bg-gray-200 z-10 overflow-hidden shadow-lg">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                                alt="Co-working collaborative space"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Statistics badge */}
                        <div className="absolute top-10 right-10 bg-white p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] z-20 flex flex-col items-center justify-center w-40 h-40">
                            <div className="relative w-20 h-20 flex items-center justify-center mb-2">
                                {/* Progress indicator */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="40" cy="40" r="32" stroke="#FEE2E2" strokeWidth="6" fill="transparent" />
                                    <circle cx="40" cy="40" r="32" stroke="#EF4444" strokeWidth="6" fill="transparent" strokeDasharray="201" strokeDashoffset="40" />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center font-bold text-xl text-[#1B2A41]">35+</span>
                            </div>
                            <span className="text-xs font-bold text-[#1B2A41]">Co-workers</span>
                            {/* Decorative corners */}
                            <div className="absolute top-0 left-0 w-1 h-1 bg-red-400"></div>
                            <div className="absolute top-0 right-0 w-1 h-1 bg-red-400"></div>
                            <div className="absolute bottom-0 left-0 w-1 h-1 bg-red-400"></div>
                            <div className="absolute bottom-0 right-0 w-1 h-1 bg-red-400"></div>
                        </div>


                        {/* Secondary image */}
                        <div className="absolute bottom-0 right-0 w-72 h-64 bg-gray-200 z-10 overflow-hidden shadow-lg border-8 border-white">
                            <img
                                src="https://m.media-amazon.com/images/I/51+6B4s2t6L._SY350_.jpg"
                                alt="Woman working in office"
                                className="w-full h-full object-cover"
                            />
                        </div>

                    </div>

                    {/* Info section */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <Gem size={16} className="text-[#F15A29]" />
                            <span className="text-[#F15A29] text-xs font-bold uppercase tracking-widest">ABOUT US</span>
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1B2A41] mb-8 leading-tight">
                            Experience CDLS As <span className="text-[#F15A29]">Co-Works</span>:<br />
                            Where Ideas <br className="md:hidden" /> Meet Collaboration
                        </h2>

                        <div className="flex flex-wrap gap-6 mb-8 text-sm font-bold text-[#1B2A41]">
                            <span className="cursor-pointer hover:text-[#00D2AA] transition-colors">LEAP Co-Works</span>
                            <span className="cursor-pointer hover:text-[#00D2AA] transition-colors">Gig Worker</span>
                            <span className="cursor-pointer hover:text-[#00D2AA] transition-colors">KSUM Member</span>
                        </div>

                        <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                            CDLS is a dynamic coworking space bringing together professionals, entrepreneurs,
                            freelancers, and innovators. More than a shared office, it creates a collaborative
                            environment with modern infrastructure, flexible seating, and essential resources for
                            growth.<br /><br />
                            CDLS fosters networking and knowledge-sharing, offering startups, professionals, and
                            businesses a collaborative hub for ideas, projects, and growth.
                        </p>

                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-[#22C59E] hover:bg-teal-500 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center shadow-lg shadow-teal-500/30"
                        >
                            Apply Now <ArrowRight size={18} className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Application modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="relative w-full max-w-4xl my-8">
                        <div onClick={(e) => e.stopPropagation()}>
                            <InterestedIndividualForm
                                onClose={() => setShowForm(false)}
                                messagePlaceholder="Tell Us About Your Company.."
                            />
                        </div>
                    </div>
                    {/* Close handler */}
                    <div className="absolute inset-0 -z-10" onClick={() => setShowForm(false)}></div>
                </div>
            )}
        </section>
    );
};

export default CoWorks;
