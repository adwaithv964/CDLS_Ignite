import React, { useState, useEffect } from 'react';
import { Settings, ToggleLeft, ToggleRight, Save, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../api/axios';

const MaintenanceSettings = () => {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(null); // page_key being saved
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const response = await api.get('/core/maintenance/settings/');
            setSettings(response.data);
            setMessage(null); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching maintenance settings:', error);

            // If 404, backend not deployed yet
            if (error.response && error.response.status === 404) {
                setMessage({
                    type: 'warning',
                    text: 'Backend maintenance endpoints not deployed yet. Please deploy backend changes to Render first.'
                });
            } else {
                setMessage({ type: 'error', text: 'Failed to load maintenance settings' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = (pageKey, currentValue) => {
        setSettings(settings.map(s =>
            s.page_key === pageKey
                ? { ...s, is_maintenance: !currentValue }
                : s
        ));
    };

    const handleMessageChange = (pageKey, message) => {
        setSettings(settings.map(s =>
            s.page_key === pageKey
                ? { ...s, message }
                : s
        ));
    };

    const handleDateChange = (pageKey, date) => {
        setSettings(settings.map(s =>
            s.page_key === pageKey
                ? { ...s, estimated_return: date || null }
                : s
        ));
    };

    const handleSave = async (pageKey) => {
        const setting = settings.find(s => s.page_key === pageKey);
        if (!setting) return;

        try {
            setSaving(pageKey);
            setMessage(null);

            await api.put(`/core/maintenance/settings/${pageKey}/`, {
                is_maintenance: setting.is_maintenance,
                message: setting.message || '',
                estimated_return: setting.estimated_return || null
            });

            setMessage({
                type: 'success',
                text: `${setting.page_name} settings updated successfully!`
            });

            // Auto-clear success message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error('Error updating settings:', error);
            setMessage({
                type: 'error',
                text: `Failed to update ${setting.page_name} settings`
            });
        } finally {
            setSaving(null);
        }
    };

    const initializeDatabase = async () => {
        try {
            setLoading(true);
            const response = await api.post('/core/maintenance/init/');
            setMessage({ type: 'success', text: response.data.message });
            fetchSettings();
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessage({
                    type: 'warning',
                    text: 'Backend maintenance endpoints not available. Deploy backend changes to Render first.'
                });
            } else {
                setMessage({ type: 'error', text: 'Failed to initialize database' });
            }
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#F15A29] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading settings...</p>
                </div>
            </div>
        );
    }

    // If no settings found and there's a warning, show deployment message
    if (settings.length === 0 && message?.type === 'warning') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Settings className="text-[#F15A29]" size={32} />
                        <h1 className="text-3xl font-bold text-gray-800">Maintenance Settings</h1>
                    </div>
                    <p className="text-gray-600">Control which pages are under maintenance and customize maintenance messages.</p>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-8">
                    <AlertCircle size={48} className="mx-auto mb-4 text-yellow-600" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Backend Not Deployed</h2>
                    <p className="text-gray-700 mb-4 text-center">The maintenance API endpoints need to be deployed to Render first.</p>

                    <div className="bg-white rounded-lg p-6 mb-4 text-left">
                        <h3 className="font-semibold text-gray-800 mb-3">📋 Deployment Steps:</h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                            <li>Commit and push backend changes to GitHub</li>
                            <li>Wait for Render to auto-deploy (or trigger manually)</li>
                            <li>Return to this page and click "Initialize Database"</li>
                        </ol>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-left">
                        <strong>💡 Note:</strong> All other features continue to work normally. The maintenance system will be ready after backend deployment.
                    </div>
                </div>
            </div>
        );
    }

    // If no settings found, show init button
    if (settings.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
                    <AlertCircle size={48} className="mx-auto mb-4 text-yellow-600" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">No Maintenance Settings Found</h2>
                    <p className="text-gray-600 mb-6">Initialize the database to create default maintenance settings for all pages.</p>
                    <button
                        onClick={initializeDatabase}
                        className="bg-[#F15A29] text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                    >
                        Initialize Database
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Settings className="text-[#F15A29]" size={32} />
                    <h1 className="text-3xl font-bold text-gray-800">Maintenance Settings</h1>
                </div>
                <p className="text-gray-600">Control which pages are under maintenance and customize maintenance messages.</p>
            </div>

            {/* Global Message */}
            {message && (
                <div className={`mb-6 p-4 rounded-lg border ${message.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : message.type === 'warning'
                            ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                    }`}>
                    <div className="flex items-center gap-2">
                        {message.type === 'success' ? (
                            <CheckCircle size={20} />
                        ) : (
                            <AlertCircle size={20} />
                        )}
                        <span className="font-medium">{message.text}</span>
                    </div>
                </div>
            )}

            {/* Settings Cards */}
            <div className="space-y-6">
                {settings.map((setting) => (
                    <div key={setting.page_key} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-800">{setting.page_name} Page</h3>
                            <button
                                onClick={() => handleToggle(setting.page_key, setting.is_maintenance)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${setting.is_maintenance
                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                    : 'bg-green-500 text-white hover:bg-green-600'
                                    }`}
                            >
                                {setting.is_maintenance ? (
                                    <>
                                        <ToggleRight size={20} />
                                        Maintenance ON
                                    </>
                                ) : (
                                    <>
                                        <ToggleLeft size={20} />
                                        Maintenance OFF
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-4">
                            {/* Maintenance Message */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Maintenance Message
                                </label>
                                <textarea
                                    value={setting.message || ''}
                                    onChange={(e) => handleMessageChange(setting.page_key, e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F15A29] focus:border-transparent"
                                    placeholder="Enter custom maintenance message..."
                                />
                            </div>

                            {/* Estimated Return Time */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Estimated Return Time (Optional)
                                </label>
                                <input
                                    type="datetime-local"
                                    value={setting.estimated_return ? new Date(setting.estimated_return).toISOString().slice(0, 16) : ''}
                                    onChange={(e) => handleDateChange(setting.page_key, e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F15A29] focus:border-transparent"
                                />
                            </div>

                            {/* Save Button */}
                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    onClick={() => handleSave(setting.page_key)}
                                    disabled={saving === setting.page_key}
                                    className="bg-[#F15A29] text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {saving === setting.page_key ? (
                                        <>
                                            <RefreshCw size={18} className="animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Save Changes
                                        </>
                                    )}
                                </button>

                                {/* Status Indicator */}
                                {setting.is_maintenance ? (
                                    <span className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                                        🚧 Users will see maintenance screen
                                    </span>
                                ) : (
                                    <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                                        ✅ Page is live
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Refresh Button */}
            <div className="mt-8 text-center">
                <button
                    onClick={fetchSettings}
                    className="text-gray-600 hover:text-gray-800 flex items-center gap-2 mx-auto"
                >
                    <RefreshCw size={16} />
                    Refresh Settings
                </button>
            </div>
        </div>
    );
};

export default MaintenanceSettings;
