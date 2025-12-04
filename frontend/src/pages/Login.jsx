import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { motion } from 'framer-motion';
import { CiLock } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const success = await login(username, password);
            if (success) {
                navigate('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
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
                        <span className="material-symbols-outlined text-2xl"><CiLock /></span>
                    </div>
                    <h2 className="text-3xl font-bold text-warm-text tracking-tight font-display">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-warm-text-muted">
                        Sign in to access your notes
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <Input
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="pl-10 bg-warm-bg/50 border-warm-primary/30 focus:border-warm-primary focus:ring-warm-primary text-warm-text placeholder:text-warm-text-muted placeholder:opacity-100"
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
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>

                    <div className="text-center text-sm text-warm-text-muted">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-warm-primary hover:text-warm-primary/80">
                            Sign up
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
