import React, { useContext, useState } from "react";
import { noteContext } from "../context/noteContext";

const Note = ({ text, date, id }) => {
    const { deleteNote, updateNote } = useContext(noteContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);

    const formatDate = () => {
        const d = new Date(date);
        const hours = d.getHours();
        const minutes = d.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${formattedHours}:${formattedMinutes}${ampm}`;
    };

    const handleEdit = () => {
        if (isEditing) {
            updateNote(id, editText); 
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="note">
            <div className="text">
                {isEditing ? (
                    <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        cols={50}
                        rows={3}
                    />
                ) : (
                    text
                )}
            </div>
            <div className="footer">
                <div className="date">{formatDate()}</div>
                <button className="btn" onClick={handleEdit}>
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button className="btn" onClick={() => deleteNote(id)}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    );
};
export default Note;