import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { AddNote } from './AddNote';
import { Noteitem } from './Noteitem';

export const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes } = context;

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])

    const updateNote = () => {

    }

    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}