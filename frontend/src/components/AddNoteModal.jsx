import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from "react-icons/io";
import Button from './ui/Button';
import Input from './ui/Input';

const AddNoteModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({ name: '', description: '', content: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onAdd(formData);
            setLoading(false);
            setFormData({ name: '', description: '', content: '' });
            onClose();
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
                    >
                        <div className="bg-warm-surface rounded-3xl shadow-recessed w-full max-w-lg pointer-events-auto border border-warm-primary/40 flex flex-col max-h-[90vh]">
                            <div className="flex items-center justify-between p-6 border-b border-warm-primary/20">
                                <h2 className="text-2xl font-bold text-warm-text font-display">New Note</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-warm-text-muted hover:text-warm-text rounded-full transition-colors"
                                >
                                    <span className="text-2xl"><IoMdClose /></span>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
                                <Input
                                    label="Note Name"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="Enter note name..."
                                    className="bg-warm-bg/50 border-warm-primary/40 outline-none focus:border-warm-primary focus:ring-warm-primary text-warm-text placeholder:text-warm-text-muted"
                                />

                                <Input
                                    label="Description"
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    placeholder="Brief description..."
                                    className="bg-warm-bg/50 border-warm-primary/40 outline-none focus:border-warm-primary focus:ring-warm-primary text-warm-text placeholder:text-warm-text-muted"
                                />

                                <div className="space-y-1">
                                    <label htmlFor="content" className="block text-sm font-medium text-warm-text">
                                        Content
                                    </label>
                                    <textarea
                                        id="content"
                                        rows={6}
                                        className="w-full px-4 py-3 border border-warm-primary/40 outline-none rounded-xl focus:ring-2 focus:ring-warm-primary focus:border-warm-primary bg-warm-bg/50 text-warm-text resize-none transition-all duration-200 placeholder:text-warm-text-muted"
                                        placeholder="Write your note here..."
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-full shadow-none"
                                        disabled={loading}
                                    >
                                        {loading ? 'Creating...' : 'Create Note'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AddNoteModal;
