import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import AddNoteModal from './AddNoteModal';
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";

const Sidebar = () => {
    const { user, logout } = useAuth();
    const { name: activeNoteName } = useParams();
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchNotes = async () => {
        try {
            const response = await client.get('/notes');
            setNotes(response.data);
        } catch (err) {
            console.error('Failed to fetch notes:', err);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [activeNoteName]);

    const handleAddNote = async (noteData) => {
        try {
            await client.post('/notes', noteData);
            await fetchNotes();
            return true;
        } catch (err) {
            console.error('Failed to add note:', err);
            alert('Failed to add note');
            throw err;
        }
    };

    return (
        <aside className="flex h-full w-full max-w-sm flex-col border-r border-black/10 bg-warm-bg p-4">
            <div className="flex items-center gap-3 pb-4">
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-warm-primary flex items-center justify-center text-warm-paper-text font-bold text-xl">
                    {user?.username?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="flex flex-col">
                    <h1 className="font-display text-warm-text text-base font-bold leading-normal">Notes App</h1>
                    <p className="text-warm-text-muted text-sm font-normal leading-normal">{user?.username || 'My Workspace'}</p>
                </div>
            </div>

            <div className="flex gap-2 pb-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex flex-1 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-warm-primary text-warm-paper-text text-sm font-bold leading-normal tracking-[0.015em] shadow-sm hover:brightness-105 transition-all"
                >
                    <span className="material-symbols-outlined text-lg"><IoIosAddCircleOutline /></span>
                    <span className="truncate">New Note</span>
                </button>
                <div className="relative">
                    <button onClick={logout} title="Logout" className="flex size-10 items-center justify-center rounded-lg border border-black/20 bg-warm-surface text-warm-text-muted hover:text-warm-text shadow-sm transition-colors">
                        <span className="material-symbols-outlined text-xl"><IoLogOutOutline /></span>
                    </button>
                </div>
            </div>

            <nav className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
                {notes.map((note) => (
                    <div
                        key={note.name}
                        onClick={() => navigate(`/note/${note.name}`)}
                        className={`flex cursor-pointer gap-4 rounded-lg p-3 transition-all ${activeNoteName === note.name
                            ? 'bg-warm-surface shadow-recessed-active'
                            : 'shadow-recessed hover:shadow-recessed-active hover:bg-warm-surface'
                            }`}
                    >
                        <div className={`flex items-center justify-center rounded-lg shrink-0 size-12 ${activeNoteName === note.name ? 'text-warm-primary' : 'text-warm-text-muted'
                            }`}>
                            <span className="material-symbols-outlined text-3xl"><MdOutlineDescription /></span>
                        </div>
                        <div className="flex flex-1 flex-col justify-center overflow-hidden">
                            <p className="font-display text-warm-text text-base font-medium leading-normal truncate">
                                {note.name}
                            </p>
                            <p className="text-warm-text-muted text-xs font-normal leading-normal">
                                {note.date ? new Date(note.date).toLocaleDateString() : 'No date'}
                            </p>
                            <p className="text-warm-text-muted text-sm font-normal leading-normal truncate">
                                {note.description || note.content}
                            </p>
                        </div>
                    </div>
                ))}
            </nav>

            <AddNoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddNote}
            />
        </aside>
    );
};

export default Sidebar;
