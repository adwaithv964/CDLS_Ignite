import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../api/axios';

const DEFAULT_SETTINGS = {
    pages: {
        home: false,
        events: false,
        members: false,
        community: false,
        cdls: false,
    },
    message: 'We\'re currently upgrading this section to serve you better. We\'ll be back soon!',
};

const STORAGE_KEY = 'cdls_maintenance_settings';

function loadSettings() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            // Merge with defaults to handle new pages added in the future
            return {
                pages: { ...DEFAULT_SETTINGS.pages, ...(parsed.pages || {}) },
                message: parsed.message ?? DEFAULT_SETTINGS.message,
            };
        }
    } catch (_) { /* ignore */ }
    return DEFAULT_SETTINGS;
}

const MaintenanceContext = createContext(null);

export function MaintenanceProvider({ children }) {
    const [settings, setSettings] = useState(loadSettings);

    // Fetch global maintenance settings from backend
    useEffect(() => {
        api.get('/core/maintenance/')
            .then(res => {
                if (res.data && res.data.pages) {
                    const newSettings = {
                        pages: { ...DEFAULT_SETTINGS.pages, ...res.data.pages },
                        message: res.data.message || DEFAULT_SETTINGS.message,
                    };
                    setSettings(newSettings);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
                }
            })
            .catch(err => console.error("Failed to fetch maintenance settings:", err));
    }, []);

    const updateSettings = useCallback((newSettings) => {
        setSettings(newSettings);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    }, []);

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === STORAGE_KEY) {
                setSettings(loadSettings());
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const togglePage = useCallback((pageKey) => {
        setSettings(prev => {
            const next = {
                ...prev,
                pages: { ...prev.pages, [pageKey]: !prev.pages[pageKey] },
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            
            // Persist to backend
            api.post('/core/maintenance/', { pages: next.pages, message: next.message })
                .catch(err => console.error("Failed to update maintenance settings:", err));
                
            return next;
        });
    }, []);

    const setMessage = useCallback((message) => {
        setSettings(prev => {
            const next = { ...prev, message };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            
            // Persist to backend
            api.post('/core/maintenance/', { pages: next.pages, message: next.message })
                .catch(err => console.error("Failed to update maintenance message:", err));
                
            return next;
        });
    }, []);

    return (
        <MaintenanceContext.Provider value={{ settings, updateSettings, togglePage, setMessage }}>
            {children}
        </MaintenanceContext.Provider>
    );
}

export function useMaintenanceMode(pageKey) {
    const ctx = useContext(MaintenanceContext);
    if (!ctx) throw new Error('useMaintenanceMode must be used within MaintenanceProvider');
    return {
        isUnderMaintenance: pageKey ? ctx.settings.pages[pageKey] : false,
        message: ctx.settings.message,
        settings: ctx.settings,
        togglePage: ctx.togglePage,
        setMessage: ctx.setMessage,
        updateSettings: ctx.updateSettings,
    };
}

export default MaintenanceContext;
