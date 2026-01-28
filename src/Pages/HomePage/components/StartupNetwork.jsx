import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import InterestedIndividualForm from '../../Members/components/InterestedIndividualForm';

const mashLogo = "/assets/mash_logo_v2.png";
const noteLogo = "/assets/note_logo_v2.png";
const founderMash = "/assets/image_5.png";
const founderNote = "/assets/image_4.png";
const globe = "/assets/globe.png";
const starGreen = "/assets/star_green.png";
const contour = "/assets/contour.png";

const StartupNetwork = () => {
    const [showForm, setShowForm] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Check for redirect action
    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        const action = params.get('action');

        if (action === 'startup_join') {
            const token = localStorage.getItem('token');
            if (token) {
                setShowForm(true);
                navigate('/', { replace: true });
            }
        }
    }, [location.search, navigate]);

    const handleJoinClick = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', {
                state: { from: `/?action=startup_join` }
            });
        } else {
            setShowForm(true);
        }
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden font-sans">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <img
                    src={globe}
                    alt="Globe"
                    className="absolute top-5 left-5 w-32 h-32 opacity-20 rotate-12"
                />
                <img
                    src={starGreen}
                    alt="Decoration"
                    className="absolute top-10 right-10 w-16 h-16"
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center space-x-3 mb-2">
                        <span className="text-orange-400 text-xs rotate-45 border border-orange-400 w-2 h-2 block"></span>
                        <span className="text-[#2DD4BF] font-extrabold tracking-[0.2em] uppercase text-xs">STARTUPS</span>
                        <span className="text-orange-400 text-xs rotate-45 border border-orange-400 w-2 h-2 block"></span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0E1C2F] mb-6">
                        CDLS <span className="text-[#FF6B6B]">Startup</span> Network
                    </h2>

                    <button
                        onClick={handleJoinClick}
                        className="bg-[#2DD4BF] hover:bg-teal-400 text-[#0b132b] px-8 py-3 rounded-full font-bold transition-transform transform hover:-translate-y-1 inline-flex items-center shadow-lg"
                    >
                        Join Our Network
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Startup card: Mash Magic */}
                    <div className="bg-[#0b132b] rounded-3xl relative overflow-hidden min-h-[400px] md:h-[400px] flex flex-col md:flex-row">
                        {/* Contour background */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${contour})`, backgroundSize: 'cover' }}></div>

                        <div className="w-full md:flex-1 p-8 md:p-10 flex flex-col justify-center z-10 order-2 md:order-1">
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

                        <div className="w-full h-64 md:w-[45%] md:h-full relative order-1 md:order-2">
                            <img
                                src={founderMash}
                                alt="Founder"
                                className="absolute bottom-0 right-0 w-full h-full object-contain object-bottom"
                            />
                        </div>
                    </div>

                    {/* Startup card: Note AI */}
                    <div className="bg-[#2DD4BF] rounded-3xl relative overflow-hidden min-h-[400px] md:h-[400px] flex flex-col md:flex-row">
                        {/* Contour background */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url(${contour})`, backgroundSize: 'cover' }}></div>

                        <div className="w-full md:flex-1 p-8 md:p-10 flex flex-col justify-center z-10 order-2 md:order-1">
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

                        <div className="w-full h-64 md:w-[45%] md:h-full relative order-1 md:order-2">
                            <img
                                src={founderNote}
                                alt="Founder"
                                className="absolute bottom-0 right-0 w-full h-full object-contain object-bottom"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="relative w-full max-w-4xl my-8">
                        <div onClick={(e) => e.stopPropagation()}>
                            <InterestedIndividualForm
                                onClose={() => setShowForm(false)}
                                messagePlaceholder="Tell Us About Your Startup..."
                                category="startup"
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

export default StartupNetwork;
