import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { X, Search, Loader2 } from 'lucide-react';
import api from '../../../api/axios';

/**
 * Debounce hook — delays calling `fn` until `delay` ms after the last call.
 */
function useDebounce(value, delay) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
}

const AddEventModal = ({ onClose, onSuccess, event = null }) => {
    const [formData, setFormData] = useState({
        title:            event?.title            || '',
        type:             event?.type             || 'Beginners',
        type_color:       event?.type_color       || 'bg-purple-500',
        date:             event?.date             || '',
        time:             event?.time             || '',
        location:         event?.location         || 'CDLS Office',
        author:           event?.author           || '',
        author_image_url: event?.author_image     || '',  // profile pic stored on event
        author_member_id: event?.author_member_id || '',  // member ID for reliable lookup
        dept:             event?.dept             || '',
        status:           event?.status           || 'Open',
        image:            null,
        image_color:      event?.image_color      || 'bg-blue-100',
        is_open:          event?.is_open !== undefined ? event.is_open : true,
    });
    // Tracks whether the current author field text was matched from autocomplete
    const [authorMatched, setAuthorMatched] = useState(
        !!(event?.author_image || event?.author_member_id)
    );
    const [loading, setLoading]   = useState(false);
    const [error, setError]       = useState('');

    // ── Autocomplete state ──────────────────────────────────────────────
    const [suggestions, setSuggestions]     = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [dropdownPos, setDropdownPos]     = useState({ top: 0, left: 0, width: 0 });
    const authorInputRef = useRef(null);

    // Debounce the raw author text — 300 ms after last keystroke
    const debouncedAuthor = useDebounce(formData.author, 300);

    // ── Live search: fires on every debounced change ───────────────────
    useEffect(() => {
        const query = debouncedAuthor.trim();

        if (!query) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        let cancelled = false;

        const searchMembers = async () => {
            setSearchLoading(true);
            try {
                // Query backend directly — always fresh from the database
                const res = await api.get('/members/', {
                    params: {
                        search: query,
                        types: 'gig_worker,mentor',   // comma-separated multi-type filter
                    },
                });
                if (!cancelled) {
                    const results = res.data || [];
                    setSuggestions(results);
                    if (results.length > 0) {
                        updateDropdownPos();
                        setShowSuggestions(true);
                    } else {
                        setShowSuggestions(false);
                    }
                }
            } catch (e) {
                if (!cancelled) {
                    console.error('Author search failed:', e);
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            } finally {
                if (!cancelled) setSearchLoading(false);
            }
        };

        searchMembers();
        return () => { cancelled = true; };
    }, [debouncedAuthor]); // re-runs on every debounced value change

    // ── Position: fixed dropdown calculation ───────────────────────────
    const updateDropdownPos = useCallback(() => {
        if (authorInputRef.current) {
            const rect = authorInputRef.current.getBoundingClientRect();
            setDropdownPos({
                top:   rect.bottom + 4,
                left:  rect.left,
                width: rect.width,
            });
        }
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        if (!showSuggestions) return;
        const onOutside = (e) => {
            if (authorInputRef.current && !authorInputRef.current.contains(e.target)) {
                const portal = document.getElementById('author-suggestions-portal');
                if (portal && portal.contains(e.target)) return;
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', onOutside);
        return () => document.removeEventListener('mousedown', onOutside);
    }, [showSuggestions]);

    // Reposition on scroll / resize while open
    useEffect(() => {
        if (!showSuggestions) return;
        window.addEventListener('scroll', updateDropdownPos, true);
        window.addEventListener('resize', updateDropdownPos);
        return () => {
            window.removeEventListener('scroll', updateDropdownPos, true);
            window.removeEventListener('resize', updateDropdownPos);
        };
    }, [showSuggestions, updateDropdownPos]);

    // ── Handlers ──────────────────────────────────────────────────────
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value),
        }));
    };

    const handleAuthorChange = (e) => {
        // Typing clears the matched-author state — requires re-selection from dropdown
        setAuthorMatched(false);
        setFormData(prev => ({
            ...prev,
            author:           e.target.value,
            author_image_url: '',  // clear stored pic when typing manually
            author_member_id: '',
        }));
    };

    const handleSelectSuggestion = (member) => {
        // Build the absolute image URL from the member record
        const imgUrl = member.image_url || '';
        setFormData(prev => ({
            ...prev,
            author:           member.name,
            author_image_url: imgUrl,
            author_member_id: member.id || '',
            dept:             member.institution || prev.dept,
        }));
        setAuthorMatched(true);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Compute status from date/time
        let currentStatus = formData.status;
        if (formData.date && formData.time) {
            const sessionDateTime = new Date(`${formData.date}T${formData.time}`);
            currentStatus = sessionDateTime > new Date() ? 'Open' : 'Closed';
        } else if (formData.date) {
            const selected = new Date(formData.date);
            const today = new Date(); today.setHours(0, 0, 0, 0);
            currentStatus = selected >= today ? 'Open' : 'Closed';
        }

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image') {
                if (formData[key] instanceof File) data.append(key, formData[key]);
            } else if (key === 'status') {
                data.append(key, currentStatus);
            } else if (formData[key] !== null && formData[key] !== undefined) {
                data.append(key, formData[key]);
            }
        });

        try {
            if (event) {
                await api.patch(`/events/${event.id}/`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await api.post('/events/', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Failed to save event:', err);
            const detail = err.response?.data
                ? (typeof err.response.data === 'object'
                    ? Object.entries(err.response.data)
                        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
                        .join(' | ')
                    : String(err.response.data))
                : 'Failed to save event. Please try again.';
            setError(detail);
        } finally {
            setLoading(false);
        }
    };

    // ── Suggestions portal — renders outside modal's overflow container ─
    const SuggestionsPortal = () => {
        if (!showSuggestions || suggestions.length === 0) return null;
        return ReactDOM.createPortal(
            <ul
                id="author-suggestions-portal"
                style={{
                    position: 'fixed',
                    top:   dropdownPos.top,
                    left:  dropdownPos.left,
                    width: dropdownPos.width,
                    zIndex: 99999,
                }}
                className="bg-white border border-gray-200 rounded-xl shadow-2xl max-h-56 overflow-y-auto py-1"
            >
                {suggestions.map(member => (
                    <li
                        key={member.id}
                        onMouseDown={(e) => {
                            e.preventDefault();   // prevent input blur before click registers
                            handleSelectSuggestion(member);
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-teal-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                    >
                        {/* Avatar — profile photo if available, else styled initial */}
                        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-gray-100 bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center font-bold text-teal-700 text-sm">
                            {member.image_url ? (
                                <img
                                    src={member.image_url}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentNode.textContent = member.name.charAt(0).toUpperCase();
                                    }}
                                />
                            ) : (
                                member.name.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-gray-800 truncate">{member.name}</p>
                            <p className="text-xs text-gray-400 capitalize truncate">
                                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mr-1 ${
                                    member.member_type === 'mentor' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                                }`}>
                                    {member.member_type.replace('_', ' ')}
                                </span>
                                {member.institution && `· ${member.institution}`}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>,
            document.body
        );
    };

    // ── Render ────────────────────────────────────────────────────────
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-800">
                        {event ? 'Edit Event' : 'Add New Event'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded text-sm border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text" name="title" value={formData.title}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
                                required
                            />
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select name="type" value={formData.type} onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300">
                                <option value="Beginners">Beginners</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Hands-on">Hands-on</option>
                                <option value="Workshop">Workshop</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
                                required />
                        </div>

                        {/* Time */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <input type="time" name="time" value={formData.time} onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
                                required />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
                                required />
                        </div>

                        {/* ── Organizer / Author — live search ── */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Organizer (Author)
                            </label>
                            <div className="relative flex items-center gap-2">
                                {/* Show selected author avatar if a member was matched */}
                                {authorMatched && formData.author_image_url && (
                                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-teal-400 shadow-sm">
                                        <img
                                            src={formData.author_image_url}
                                            alt={formData.author}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    </div>
                                )}
                                {authorMatched && !formData.author_image_url && (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold border-2 border-teal-400 shadow-sm">
                                        {formData.author ? formData.author.charAt(0).toUpperCase() : '?'}
                                    </div>
                                )}
                                <div className="relative flex-1">
                                    <input
                                        ref={authorInputRef}
                                        type="text"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleAuthorChange}
                                        autoComplete="off"
                                        className={`w-full border rounded px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-300 ${
                                            authorMatched ? 'border-teal-400 bg-teal-50' : ''
                                        }`}
                                        placeholder="Type a name to search…"
                                        required
                                    />
                                    {/* Search spinner / icon inside the input */}
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                                        {searchLoading
                                            ? <Loader2 size={14} className="animate-spin text-teal-400" />
                                            : authorMatched
                                                ? <span className="text-teal-500 text-xs font-bold">✓</span>
                                                : <Search size={14} />
                                        }
                                    </span>
                                </div>
                            </div>
                            <p className="text-[11px] mt-0.5">
                                {authorMatched
                                    ? <span className="text-teal-600 font-medium">✓ Matched — profile image will appear on event card</span>
                                    : <span className="text-gray-400">Type to search mentors &amp; gig workers • select to link profile photo</span>
                                }
                            </p>
                            {/* Portal dropdown — escapes overflow:auto parent */}
                            <SuggestionsPortal />
                        </div>

                        {/* Department */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <input type="text" name="dept" value={formData.dept} onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
                                required />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300">
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                    </div>

                    {/* Event Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                        {(event?.image_url || event?.image) && (
                            <div className="mb-3 flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                                <img
                                    src={event.image_url || event.image}
                                    alt="Current event"
                                    className="h-14 w-24 object-cover rounded border border-gray-200 flex-shrink-0"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                <span className="text-xs text-gray-500">Current image — leave blank to keep it</span>
                            </div>
                        )}
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/png, image/jpeg, image/jpg"
                            className="w-full border rounded px-3 py-2 text-sm"
                        />
                        <p className="text-xs text-gray-400 mt-1">Accepted: PNG, JPG, JPEG</p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end pt-4 gap-3">
                        <button
                            type="button" onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 border rounded hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit" disabled={loading}
                            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded font-medium disabled:opacity-50 transition"
                        >
                            {loading ? 'Saving…' : (event ? 'Update Event' : 'Create Event')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEventModal;
