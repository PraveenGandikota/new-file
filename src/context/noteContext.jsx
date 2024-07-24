import { createContext, useEffect, useState } from "react";
import { notes as noteData } from "../data/notesData";
export const noteContext = createContext(null);

export default function ContextProvider (props){
    const [notes, setNotes] = useState(null);

    useEffect(() => {
        const fetchedData = fetchFromLocal();
        setNotes(fetchedData);
    }, [])

    useEffect(() => {
        if (notes){
            saveToLocal();
        }
    }, [notes])

    const addNote = (newNote) => {
        setNotes((prev) => {
            if (prev){
               return [newNote, ...prev]
            }
            return [newNote]
        })
        
    }

    const deleteNote = (index) => {
        setNotes(prev =>{
            const temp = [...prev]
            temp.splice(index, 1)

            return temp;
        })
    }

    const saveToLocal = () => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    const fetchFromLocal = () => {
        return JSON.parse(localStorage.getItem("notes"));
    }

    const val = {notes, addNote, deleteNote};
    return (
        <noteContext.Provider value={val}>
            {props.children}
        </noteContext.Provider>
    )
}