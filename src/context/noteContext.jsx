import { createContext, useEffect, useState } from "react";
export const noteContext = createContext(null);
export default function ContextProvider(props) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchedData = fetchFromLocal();
        setNotes(fetchedData || []);
    }, []);

    useEffect(() => {
        if (notes.length) {
            saveToLocal();
        }
    }, [notes]);

    const addNote = (newNote) => {
        setNotes((prev) => [newNote, ...prev]);
    };

    const deleteNote = (index) => {
        setNotes((prev) => prev.filter((_, i) => i !== index));
    };

    const updateNote = (index, updatedText) => {
        setNotes((prev) =>
            prev.map((note, i) =>
                i === index ? { ...note, text: updatedText } : note
            )
        );
    };

    const saveToLocal = () => {
        localStorage.setItem("notes", JSON.stringify(notes));
    };

    const fetchFromLocal = () => {
        return JSON.parse(localStorage.getItem("notes"));
    };

    const val = { notes, addNote, deleteNote, updateNote };
    return (
        <noteContext.Provider value={val}>
            {props.children}
        </noteContext.Provider>
    );
} 