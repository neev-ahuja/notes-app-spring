import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaEdit } from "react-icons/fa";

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-warm-primary/10 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-warm-primary"><FaEdit /></span>
            </div>
            <h1 className="font-display text-4xl font-bold text-warm-text mb-4">
                Welcome back, {user?.username || 'User'}
            </h1>
            <p className="text-warm-text-muted text-lg max-w-md">
                Select a note from the sidebar to view or edit, or create a new one to get started.
            </p>
        </div>
    );
};

export default Dashboard;
