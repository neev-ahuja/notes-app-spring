import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

const NoteCard = ({ note, onDelete }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/note/${note.name}`)}
            className="bg-white dark:bg-black rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-primary/40 group relative overflow-hidden cursor-pointer"
        >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(note.name);
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors flex items-center justify-center"
                    title="Delete note"
                >
                    <span className="material-symbols-outlined text-xl"><MdDelete /></span>
                </button>
            </div>

            <h3 className="text-xl font-bold text-black dark:text-white mb-2 pr-8 truncate">
                {note.name}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                {note.content}
            </p>

            <div className="flex items-center text-xs text-gray-400 mt-auto pt-4 border-t border-primary/20">
                <span className="material-symbols-outlined text-sm mr-1">calendar_today</span>
                <span>
                    {note.date ? new Date(note.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }) : 'No date'}
                </span>
            </div>
        </motion.div>
    );
};

export default NoteCard;
