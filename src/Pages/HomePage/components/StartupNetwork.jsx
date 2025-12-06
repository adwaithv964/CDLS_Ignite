import React from 'react';
import { ArrowRight } from 'lucide-react';
const mashLogo = "/assets/mash_logo_v2.png";
const noteLogo = "/assets/note_logo_v2.png";
const founderMash = "/assets/founder_mash_v2.png";
const founderNote = "/assets/founder_note_v2.png";
const globe = "/assets/globe.png";
const asterisk = "/assets/asterisk.png";
const contour = "/assets/contour.png";

const StartupNetwork = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden font-sans">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <img
                    src={globe}
                    alt="Globe"
                    className="absolute top-5 left-5 w-32 h-32 opacity-20 rotate-12"
                />
                <img
                    src={asterisk}
                    alt="Decoration"
                    className="absolute top-10 right-10 w-16 h-16 text-[#2DD4BF]"
                    style={{ filter: 'invert(59%) sepia(21%) saturate(1115%) hue-rotate(124deg) brightness(98%) contrast(92%)' }}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center space-x-3 mb-2">
                        <span className="text-orange-400 text-xs rotate-45 border border-orange-400 w-2 h-2 block"></span>
                        <span className="text-[#2DD4BF] font-extrabold tracking-[0.2em] uppercase text-xs">STARTUPS</span>
                        <span className="text-orange-400 text-xs rotate-45 border border-orange-400 w-2 h-2 block"></span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0E1C2F]">
                        CDLS <span className="text-[#FF6B6B]">Startup</span> Network
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Card 1: Mash Magic */}
                    <div className="bg-[#0b132b] rounded-3xl relative overflow-hidden h-[400px] flex">
                        {/* Background contour */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${contour})`, backgroundSize: 'cover' }}></div>

                        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center z-10">
                            <div className="bg-white rounded-lg p-2 w-32 mb-6">
                                <img src={mashLogo} alt="Mash Magic" className="w-full h-auto object-contain" />
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-xs font-medium">
                                Empowering Students With Personalized Mentorship And Innovative Online Learning For Every Child's Unique Journey.
                            </p>
                            <a
                                href="https://mashmagicedu.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#2DD4BF] hover:bg-teal-300 text-[#0b132b] px-6 py-2 rounded-full font-bold transition-transform transform hover:-translate-y-1 inline-flex items-center w-max text-sm"
                            >
                                Know More <ArrowRight size={16} className="ml-2" />
                            </a>
                        </div>

                        <div className="w-[45%] h-full relative">
                            <img
                                src={founderMash}
                                alt="Founder"
                                className="absolute bottom-0 right-0 w-full h-[90%] object-cover object-bottom"
                                style={{ maskImage: 'linear-gradient(to right, transparent, black 10%)' }} // Attempt to blend edge if needed, but solid color BG should blend
                            />
                        </div>
                    </div>

                    {/* Card 2: Note AI */}
                    <div className="bg-[#2DD4BF] rounded-3xl relative overflow-hidden h-[400px] flex">
                        {/* Background contour */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url(${contour})`, backgroundSize: 'cover' }}></div>

                        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center z-10">
                            <div className="w-16 h-16 mb-6">
                                <img src={noteLogo} alt="Note AI" className="w-full h-full object-contain drop-shadow-lg rounded-xl" />
                            </div>

                            <p className="text-white font-semibold text-sm leading-relaxed mb-8 max-w-xs">
                                NoteAI Is Kerala's First Student-Led AI Edtech Startup, Founded By 20-Year-Old Entrepreneur And Educator Ansar MP
                            </p>
                            <a
                                href="https://www.noteai.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#0F172A] hover:bg-gray-800 text-white px-6 py-2 rounded-full font-bold transition-transform transform hover:-translate-y-1 inline-flex items-center w-max text-sm"
                            >
                                Know More <ArrowRight size={16} className="ml-2" />
                            </a>
                        </div>

                        <div className="w-[45%] h-full relative">
                            <img
                                src={founderNote}
                                alt="Founder"
                                className="absolute bottom-0 right-0 w-full h-[90%] object-cover object-bottom"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StartupNetwork;
