import React, { useState } from 'react';
import { Wrench, ToggleLeft, ToggleRight, Save, CheckCircle } from 'lucide-react';
import { useMaintenanceMode } from '../../context/MaintenanceContext';

const PAGE_CONFIG = [
    { key: 'home',      label: 'Home',      description: 'The main landing page (/)',             path: '/' },
    { key: 'events',    label: 'Events',    description: 'Events listing page (/events)',          path: '/events' },
    { key: 'members',   label: 'Members',   description: 'Members directory page (/members)',      path: '/members' },
    { key: 'community', label: 'Community', description: 'Community page (/community)',            path: '/community' },
    { key: 'cdls',      label: 'CDLS',      description: 'About CDLS page (/cdls)',               path: '/cdls' },
];

const MaintenanceManager = () => {
    const { settings, togglePage, setMessage } = useMaintenanceMode();
    const [localMessage, setLocalMessage] = useState(settings.message);
    const [saved, setSaved] = useState(false);

    const handleSaveMessage = () => {
        setMessage(localMessage);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const activeCount = Object.values(settings.pages).filter(Boolean).length;

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 p-3 rounded-xl">
                    <Wrench size={24} className="text-[#F15A29]" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Maintenance Mode</h1>
                    <p className="text-sm text-gray-500">
                        {activeCount === 0
                            ? 'All pages are live'
                            : `${activeCount} page${activeCount > 1 ? 's' : ''} under maintenance`}
                    </p>
                </div>
            </div>

            {/* Status Banner */}
            {activeCount > 0 && (
                <div className="mb-6 flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl px-5 py-4">
                    <div className="w-3 h-3 bg-[#F15A29] rounded-full animate-pulse flex-shrink-0" />
                    <p className="text-sm text-orange-800 font-medium">
                        Maintenance mode is active on {activeCount} page{activeCount > 1 ? 's' : ''}. Visitors will see the maintenance screen.
                    </p>
                </div>
            )}

            {/* Page Toggles */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-700">Page Toggles</h2>
                </div>
                <div className="divide-y divide-gray-50">
                    {PAGE_CONFIG.map(({ key, label, description, path }) => {
                        const isOn = settings.pages[key];
                        return (
                            <div
                                key={key}
                                className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-800">{label}</span>
                                        {isOn && (
                                            <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                                MAINTENANCE
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-0.5">{description}</p>
                                </div>
                                <button
                                    onClick={() => togglePage(key)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        isOn
                                            ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                    aria-label={`Toggle maintenance for ${label}`}
                                >
                                    {isOn
                                        ? <ToggleRight size={20} className="text-[#F15A29]" />
                                        : <ToggleLeft size={20} />}
                                    {isOn ? 'On' : 'Off'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Custom Message */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-700">Custom Maintenance Message</h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Shown to visitors on maintenance pages
                    </p>
                </div>
                <div className="p-6">
                    <textarea
                        value={localMessage}
                        onChange={e => setLocalMessage(e.target.value)}
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#F15A29] transition resize-none"
                        placeholder="Enter a message for visitors..."
                    />
                    <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-gray-400">
                            Leave blank to use the default page-specific message
                        </p>
                        <button
                            onClick={handleSaveMessage}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                                saved
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-[#F15A29] text-white hover:bg-orange-600 shadow hover:shadow-md'
                            }`}
                        >
                            {saved ? (
                                <><CheckCircle size={16} /> Saved!</>
                            ) : (
                                <><Save size={16} /> Save Message</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaintenanceManager;
