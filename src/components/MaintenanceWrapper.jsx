import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import MaintenanceScreen from './MaintenanceScreen';

/**
 * MaintenanceWrapper HOC
 * Wraps pages to automatically check and display maintenance mode
 * 
 * Usage:
 * export default () => (
 *   <MaintenanceWrapper pageKey="members">
 *     <MembersPage />
 *   </MaintenanceWrapper>
 * );
 */
const MaintenanceWrapper = ({ pageKey, children }) => {
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
    const [maintenanceData, setMaintenanceData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkMaintenanceStatus = async () => {
            try {
                // Check maintenance status for this specific page
                const response = await api.get(`/core/maintenance/status/?page=${pageKey}`);
                const data = response.data;

                setIsMaintenanceMode(data.is_maintenance || false);
                setMaintenanceData(data);
            } catch (error) {
                // If 404, backend endpoints don't exist yet (not deployed)
                // Gracefully fail by showing normal page
                if (error.response && error.response.status === 404) {
                    console.warn(`Maintenance endpoints not available (backend not deployed). Showing normal page.`);
                } else {
                    console.error(`Error checking maintenance status for ${pageKey}:`, error);
                }
                // On error, default to showing the page (fail open)
                setIsMaintenanceMode(false);
            } finally {
                setLoading(false);
            }
        };

        checkMaintenanceStatus();
    }, [pageKey]);

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#F15A29] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Show maintenance screen if enabled
    if (isMaintenanceMode && maintenanceData) {
        return (
            <MaintenanceScreen
                pageName={maintenanceData.page_name || pageKey}
                message={maintenanceData.message}
                estimatedReturn={maintenanceData.estimated_return}
            />
        );
    }

    // Show normal page content
    return <>{children}</>;
};

export default MaintenanceWrapper;
