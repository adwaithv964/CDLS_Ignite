import React, { useState, useEffect, useRef } from 'react';
import {
    Users, UserCheck, Briefcase, GraduationCap,
    Plus, Edit2, Trash2, X, Save, Upload, Search
} from 'lucide-react';
import api from '../../api/axios';

const TYPE_TABS = [
    { key: 'learner',    label: 'Learners',    icon: <Users size={16} /> },
    { key: 'gig_worker', label: 'Gig Workers', icon: <Briefcase size={16} /> },
    { key: 'mentor',     label: 'Mentors',      icon: <GraduationCap size={16} /> },
];

const EMPTY_FORM = {
    member_type: 'learner',
    name: '',
    institution: '',
    location: '',
    tags: '',
    phone: '',
    email: '',
    profile_details: '',
    expertise_skills: '',
    image: null,
};

const formatApiError = (error, fallback = 'Failed to save member.') => {
    const data = error?.response?.data;

    if (!data) return fallback;

    if (typeof data === 'string') {
        if (data.trim().startsWith('<!doctype html') || data.trim().startsWith('<html')) {
            return fallback;
        }
        return data;
    }

    if (typeof data === 'object') {
        return Object.entries(data)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join(' | ');
    }

    return fallback;
};

const MembersManager = () => {
    const [activeType, setActiveType] = useState('learner');
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [imagePreview, setImagePreview] = useState(null);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const fileRef = useRef();

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const res = await api.get('/members/');
            setMembers(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMembers(); }, []);

    const filtered = members.filter(m =>
        m.member_type === activeType &&
        (m.name.toLowerCase().includes(search.toLowerCase()) ||
         (m.institution || '').toLowerCase().includes(search.toLowerCase()))
    );

    const openCreate = () => {
        setForm({ ...EMPTY_FORM, member_type: activeType });
        setImagePreview(null);
        setEditingId(null);
        setError('');
        setShowForm(true);
    };

    const openEdit = (member) => {
        setForm({
            member_type: member.member_type,
            name: member.name || '',
            institution: member.institution || '',
            location: member.location || '',
            tags: member.tags || '',
            phone: member.phone || '',
            email: member.email || '',
            profile_details: member.profile_details || '',
            expertise_skills: member.expertise_skills || '',
            image: null,
        });
        setImagePreview(member.image_url || null);
        setEditingId(member.id);
        setError('');
        setShowForm(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setForm(f => ({ ...f, image: file }));
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        if (!form.name.trim()) { setError('Name is required.'); return; }
        setSaving(true);
        setError('');
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => {
                if (k === 'image') {
                    if (v) fd.append('image', v);
                } else {
                    fd.append(k, v);
                }
            });

            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            if (editingId) {
                await api.patch(`/members/${editingId}/`, fd, config);
            } else {
                await api.post('/members/', fd, config);
            }
            setShowForm(false);
            fetchMembers();
        } catch (e) {
            setError(formatApiError(e));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this member?')) return;
        try {
            await api.delete(`/members/${id}/`);
            setMembers(m => m.filter(x => x.id !== id));
        } catch (e) {
            alert('Failed to delete.');
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-3 rounded-xl">
                        <UserCheck size={22} className="text-[#F15A29]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Members</h1>
                        <p className="text-sm text-gray-500">{members.length} total members</p>
                    </div>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-[#F15A29] hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow transition"
                >
                    <Plus size={16} /> Add Member
                </button>
            </div>

            {/* Type Tabs */}
            <div className="flex gap-2 mb-5">
                {TYPE_TABS.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveType(tab.key)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            activeType === tab.key
                                ? 'bg-[#1B2A41] text-white shadow'
                                : 'bg-white text-gray-600 border hover:bg-gray-50'
                        }`}
                    >
                        {tab.icon} {tab.label}
                        <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                            activeType === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                            {members.filter(m => m.member_type === tab.key).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative mb-4">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name or institution..."
                    className="w-full pl-9 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
            </div>

            {/* Members Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-16 text-gray-400">Loading…</div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                        <Users size={40} className="mb-3 opacity-30" />
                        <p className="text-sm">No {activeType.replace('_', ' ')}s found.</p>
                        <button onClick={openCreate} className="mt-3 text-[#F15A29] text-sm font-medium hover:underline">
                            + Add first
                        </button>
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Member</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Institution</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Contact</th>
                                <th className="text-right px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map(member => (
                                <tr key={member.id} className="hover:bg-gray-50 transition">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-orange-100 flex-shrink-0 flex items-center justify-center text-[#F15A29] font-bold text-sm">
                                                {member.image_url ? (
                                                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                                                ) : member.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{member.name}</p>
                                                {member.tags && <p className="text-xs text-purple-500">{member.tags}</p>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-gray-600 hidden md:table-cell">{member.institution || '—'}</td>
                                    <td className="px-5 py-4 text-gray-500 hidden lg:table-cell">
                                        <div>{member.phone}</div>
                                        <div className="text-xs text-gray-400">{member.email}</div>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openEdit(member)}
                                                className="p-2 rounded-lg text-gray-400 hover:text-[#1B2A41] hover:bg-gray-100 transition"
                                            >
                                                <Edit2 size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(member.id)}
                                                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Add / Edit Modal */}
            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                    onClick={() => setShowForm(false)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h2 className="text-lg font-bold text-gray-800">
                                {editingId ? 'Edit Member' : 'Add Member'}
                            </h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Member Type */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Member Type</label>
                                <div className="flex gap-2">
                                    {TYPE_TABS.map(tab => (
                                        <button
                                            key={tab.key}
                                            onClick={() => setForm(f => ({ ...f, member_type: tab.key }))}
                                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition ${
                                                form.member_type === tab.key
                                                    ? 'bg-[#F15A29] text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        >
                                            {tab.icon} {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Profile Photo</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-28 rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center flex-shrink-0">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="preview" className="w-full h-full object-cover object-top" />
                                        ) : (
                                            <Upload size={24} className="text-gray-300" />
                                        )}
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => fileRef.current.click()}
                                            className="border border-gray-300 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition"
                                        >
                                            Choose Image
                                        </button>
                                        <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
                                        <input
                                            ref={fileRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Name + Institution */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Full Name *</label>
                                    <input
                                        id="member-name"
                                        name="name"
                                        autoComplete="name"
                                        value={form.name}
                                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                        className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                                        placeholder="e.g. Melvin Warner"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Entity / Institution / Company</label>
                                    <input
                                        id="member-institution"
                                        name="institution"
                                        autoComplete="organization"
                                        value={form.institution}
                                        onChange={e => setForm(f => ({ ...f, institution: e.target.value }))}
                                        className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                                        placeholder="e.g. Mash Magic office"
                                    />
                                </div>
                            </div>

                            {/* Tags + Location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Role Tags</label>
                                    <input
                                        id="member-tags"
                                        name="tags"
                                        autoComplete="off"
                                        value={form.tags}
                                        onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                                        className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                                        placeholder="e.g. Student, Freelancer, Entrepreneur"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Comma-separated</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Location</label>
                                    <input
                                        id="member-location"
                                        name="location"
                                        autoComplete="address-level2"
                                        value={form.location}
                                        onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                                        className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                                        placeholder="e.g. Thamarassery, Kerala"
                                    />
                                </div>
                            </div>

                            {/* Phone + Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Phone</label>
                                    <input
                                        id="member-phone"
                                        name="phone"
                                        autoComplete="tel"
                                        value={form.phone}
                                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                                        className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                                        placeholder="e.g. +91 9876543210"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="member-email"
                                        name="email"
                                        autoComplete="email"
                                        value={form.email}
                                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                        className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                                        placeholder="e.g. name@example.com"
                                    />
                                </div>
                            </div>

                            {/* Profile Details */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Profile Details</label>
                                <textarea
                                    rows={3}
                                    id="member-profile-details"
                                    name="profile_details"
                                    autoComplete="off"
                                    value={form.profile_details}
                                    onChange={e => setForm(f => ({ ...f, profile_details: e.target.value }))}
                                    className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 resize-none"
                                    placeholder="A short bio or description about this member…"
                                />
                            </div>

                            {/* Expertise & Skills */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Expertise &amp; Skills</label>
                                <input
                                    id="member-expertise-skills"
                                    name="expertise_skills"
                                    autoComplete="off"
                                    value={form.expertise_skills}
                                    onChange={e => setForm(f => ({ ...f, expertise_skills: e.target.value }))}
                                    className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    placeholder="e.g. Web Development, Hardware, Content Creation"
                                />
                                <p className="text-xs text-gray-400 mt-1">Comma-separated list of skills</p>
                            </div>

                            {/* Error */}
                            {error && <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>}

                            {/* Actions */}
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="px-5 py-2.5 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-[#F15A29] hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition shadow disabled:opacity-60"
                                >
                                    <Save size={15} />
                                    {saving ? 'Saving…' : (editingId ? 'Update' : 'Create')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MembersManager;
