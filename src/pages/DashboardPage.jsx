import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser, logout } from '../features/auth/authSlice';
import { selectProfile, loadProfile } from '../features/profile/profileSlice';
import DashboardCard from '../components/Dashboard/DashboardCard';
import TaskList from '../components/Tasks/TaskList';
import NotificationsPanel from '../components/Notifications/NotificationsPanel';
import UserProfileForm from '../components/Profile/UserProfileForm';
import SalesCard from '../components/Dashboard/SalesCard';

export default function DashboardPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const profile = useSelector(selectProfile);
    const [showProfileModal, setShowProfileModal] = useState(false);

    useEffect(() => {
        // Check auth
        if (!user) {
            navigate('/login');
            return;
        }

        // Load profile data if needed
        if (!profile.id) {
            dispatch(loadProfile());
        }
    }, [user, profile.id, dispatch, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (!user || !profile) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="w-full bg-white shadow-sm py-4 mb-8">
                <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
                    <div className="text-xl font-bold text-gray-800">
                        MY Dashboard
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-700 font-medium">
                            {profile.firstName || user.firstName || ''} {profile.lastName || user.lastName || ''}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Dashboard 2x2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sales Card */}
                    <SalesCard />
                    {/* User Profile Card */}
                    <UserProfileForm />
                    {/* Notifications Panel */}
                    <NotificationsPanel />
                    {/* Tasks List */}
                    <TaskList />
                </div>
            </div>
        </div>
    );
}
