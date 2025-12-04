import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { motion } from 'framer-motion';
import { CiLock } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { MdOutlineBadge } from "react-icons/md";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(formData.name, formData.username, formData.password);
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-warm-bg p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8 bg-warm-surface p-8 rounded-3xl shadow-recessed border border-black/10"
            >
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-warm-primary rounded-full flex items-center justify-center mb-4 text-warm-paper-text">
                        <span className="material-symbols-outlined text-2xl"><IoPerson /></span>
                    </div>
                    <h2 className="text-3xl font-bold text-warm-text tracking-tight font-display">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-warm-text-muted">
                        Sign up to start taking notes
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <Input
                                id="name"
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="pl-10 bg-warm-bg/50 border-warm-primary/30 focus:border-warm-primary focus:ring-warm-primary text-warm-text placeholder:text-warm-text-muted"
                            />
                            <span className="material-symbols-outlined absolute left-3 top-3.5 text-xl text-warm-text-muted"><MdOutlineBadge /></span>
                        </div>

                        <div className="relative">
                            <Input
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                                className="pl-10 bg-warm-bg/50 border-warm-primary/30 focus:border-warm-primary focus:ring-warm-primary text-warm-text placeholder:text-warm-text-muted"
                            />
                            <span className="material-symbols-outlined absolute left-3 top-3.5 text-xl text-warm-text-muted"><IoPerson /></span>
                        </div>

                        <div className="relative">
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                className="pl-10 bg-warm-bg/50 border-warm-primary/30 focus:border-warm-primary focus:ring-warm-primary text-warm-text placeholder:text-warm-text-muted"
                            />
                            <span className="material-symbols-outlined absolute left-3 top-3.5 text-xl text-warm-text-muted"><CiLock /></span>
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded-lg"
                        >
                            {error}
                        </motion.div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full shadow-none"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>

                    <div className="text-center text-sm text-warm-text-muted">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-warm-primary hover:text-warm-primary/80">
                            Sign in
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Register;
