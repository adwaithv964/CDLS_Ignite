import React, { useState, useEffect } from 'react';
import { BarChart3, Save, RefreshCw, Users, Globe, CheckCircle } from 'lucide-react';
import api from '../../api/axios';

const SiteStatsManager = () => {
    const [form, setForm] = useState({
        learners_count: 25,
        learners_suffix: '+',
        communities_count: 35,
        communities_suffix: '+',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    const fetchStats = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.get('/core/site-stats/');
            setForm({
                learners_count:     res.data.learners_count     ?? 25,
                learners_suffix:    res.data.learners_suffix    ?? '+',
                communities_count:  res.data.communities_count  ?? 35,
                communities_suffix: res.data.communities_suffix ?? '+',
            });
        } catch (e) {
            setError('Failed to load current stats.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchStats(); }, []);

    const handleSave = async () => {
        setSaving(true);
        setError('');
        setSaved(false);
        try {
            await api.post('/core/site-stats/', {
                learners_count:     Number(form.learners_count),
                learners_suffix:    form.learners_suffix,
                communities_count:  Number(form.communities_count),
                communities_suffix: form.communities_suffix,
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e) {
            setError('Failed to save. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const StatCard = ({ icon: Icon, iconBg, iconColor, label, countKey, suffixKey, previewColor }) => (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
                <div className={`${iconBg} p-3 rounded-xl`}>
                    <Icon size={20} className={iconColor} />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800">{label}</h3>
                    <p className="text-xs text-gray-400">Displayed on home page hero</p>
                </div>
            </div>

            {/* Live preview badge */}
            <div className="mb-5 flex justify-center">
                <div className="bg-white border border-gray-100 shadow-lg rounded-full px-6 py-3 flex flex-col items-center min-w-[120px]">
                    <span className={`font-bold text-2xl ${previewColor}`}>
                        {form[countKey]}{form[suffixKey]}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold">{label}</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Count</label>
                    <input
                        type="number"
                        min={0}
                        max={9999}
                        value={form[countKey]}
                        onChange={e => setForm(f => ({ ...f, [countKey]: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 font-semibold"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Suffix</label>
                    <input
                        type="text"
                        maxLength={3}
                        value={form[suffixKey]}
                        onChange={e => setForm(f => ({ ...f, [suffixKey]: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 text-center font-semibold"
                        placeholder="+"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto pt-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-teal-100 p-3 rounded-xl">
                        <BarChart3 size={22} className="text-teal-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Site Stats</h1>
                        <p className="text-sm text-gray-500">Edit the Learners & Communities badges on the home page</p>
                    </div>
                </div>
                <button
                    onClick={fetchStats}
                    className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition"
                    title="Refresh"
                >
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20 text-gray-400">Loading…</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <StatCard
                            icon={Users}
                            iconBg="bg-purple-100"
                            iconColor="text-purple-600"
                            label="Learners"
                            countKey="learners_count"
                            suffixKey="learners_suffix"
                            previewColor="text-[#5D5FEF]"
                        />
                        <StatCard
                            icon={Globe}
                            iconBg="bg-teal-100"
                            iconColor="text-teal-600"
                            label="Communities"
                            countKey="communities_count"
                            suffixKey="communities_suffix"
                            previewColor="text-[#00D2AA]"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-3 mb-4">{error}</p>
                    )}

                    {saved && (
                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg px-4 py-3 mb-4">
                            <CheckCircle size={16} />
                            Stats saved! The home page will now show the updated values.
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-semibold shadow transition disabled:opacity-60"
                        >
                            <Save size={15} />
                            {saving ? 'Saving…' : 'Save Changes'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SiteStatsManager;
