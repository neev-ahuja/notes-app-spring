import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import client from '../api/client';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { motion } from 'framer-motion';
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { IoMdSave } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";

const NoteDetail = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ description: '', content: '' });

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await client.get('/notes');
                const foundNote = response.data.find(n => n.name === name);
                if (foundNote) {
                    setNote(foundNote);
                    setEditForm({ description: foundNote.description, content: foundNote.content });
                } else {
                    navigate('/');
                }
            } catch (err) {
                console.error('Failed to fetch note:', err);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [name, navigate]);

    const handleUpdate = async () => {
        try {
            await client.delete(`/notes/${name}`);
            await client.post('/notes', {
                name: name,
                description: editForm.description,
                content: editForm.content
            });

            setNote({ ...note, ...editForm });
            setIsEditing(false);
        } catch (err) {
            console.error('Failed to update note:', err);
            alert('Failed to update note');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;
        try {
            await client.delete(`/notes/${name}`);
            navigate('/');
        } catch (err) {
            console.error('Failed to delete note:', err);
        }
    };

    if (loading) return <div className="flex items-center justify-center h-full text-warm-text">Loading...</div>;
    if (!note) return null;

    return (
        <div className="p-8 md:p-12 lg:p-16 min-h-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-4xl rounded-lg bg-warm-paper paper-texture p-8 md:p-12 lg:p-16 shadow-lg text-warm-paper-text"
            >
                <div className="flex flex-wrap justify-between gap-3 pb-8 border-b border-black/10 mb-8">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" onClick={() => navigate('/')} className="!p-2 text-warm-paper-text/70 hover:text-warm-paper-text rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-xl"><IoMdArrowRoundBack /></span>
                            </Button>
                            <h1 className="font-display text-4xl font-bold leading-tight">
                                {note.name}
                            </h1>
                        </div>
                        <div className="flex items-center gap-2 text-warm-paper-text/70 text-base font-normal leading-normal">
                            <span className="material-symbols-outlined text-base"><FaCalendarAlt /></span>
                            <span>
                                {note.date ? new Date(note.date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : 'No date'}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 self-start">
                        {!isEditing ? (
                            <>
                                <Button variant="ghost" onClick={() => setIsEditing(true)} className="!p-2 text-warm-primary hover:bg-warm-primary/10 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-xl"><FaRegEdit /></span>
                                </Button>
                                <Button variant="ghost" onClick={handleDelete} className="!p-2 text-red-600 hover:bg-red-50 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-xl"><MdDelete /></span>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" onClick={() => setIsEditing(false)} className="!p-2 text-warm-paper-text hover:bg-black/5 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-xl"><IoMdClose /></span>
                                </Button>
                                <Button variant="primary" onClick={handleUpdate} className="!p-2 bg-warm-primary hover:brightness-105 text-warm-paper-text font-bold rounded-full shadow-sm flex items-center justify-center">
                                    <span className="material-symbols-outlined text-xl"><IoMdSave /></span>
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {isEditing ? (
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-warm-paper-text/70">
                                Description
                            </label>
                            <Input
                                value={editForm.description}
                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                className="bg-white/50 border-warm-primary/40 focus:border-warm-primary focus:ring-warm-primary text-warm-paper-text placeholder-warm-paper-text/40"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-warm-paper-text/70">
                                Content
                            </label>
                            <textarea
                                rows={15}
                                className="w-full px-4 py-3 border border-warm-primary/40 outline-none rounded-xl focus:ring-2 focus:ring-warm-primary focus:border-warm-primary bg-white/50 text-warm-paper-text resize-none placeholder-warm-paper-text/40"
                                value={editForm.content}
                                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                            />
                        </div>
                    </div>
                ) : (
                    <article className="prose prose-stone max-w-none text-warm-paper-text prose-headings:font-display prose-headings:text-warm-paper-text prose-p:text-lg prose-p:leading-relaxed prose-li:text-lg prose-strong:text-warm-paper-text">
                        {note.description && (
                            <p className="lead italic text-warm-paper-text/80 border-l-4 border-warm-primary pl-4 mb-8">
                                {note.description}
                            </p>
                        )}
                        <div className="whitespace-pre-wrap">
                            {note.content}
                        </div>
                    </article>
                )}
            </motion.div>
        </div>
    );
};

export default NoteDetail;
