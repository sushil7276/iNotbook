import React, { useState } from 'react'
import NoteContext from './NoteContext'


export const NoteState = (props) => {

    const host = "http://localhost:5000"
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial)


    // Get all Notes
    const getNotes = async () => {
        // TODO: API Call
        // Logic to edit client
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjMTU1MWE1ZDFmNWI0NzBkMzA4ZjBjIn0sImlhdCI6MTY3MzYzODAzM30.mujrAw7CNe9GjlXdQ3rlaMhUs-AorT0SwdlBN2ZbRug"
            },
        });
        const json = await response.json()
        setNotes(json)
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // TODO: API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjMTU1MWE1ZDFmNWI0NzBkMzA4ZjBjIn0sImlhdCI6MTY3MzYzODAzM30.mujrAw7CNe9GjlXdQ3rlaMhUs-AorT0SwdlBN2ZbRug"
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Delete A Note
    const deleteNote = async (id) => {
        // TODO: API Call
        // API CALL
        const response = await fetch(`${host}/api/notes/delete/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjMTU1MWE1ZDFmNWI0NzBkMzA4ZjBjIn0sImlhdCI6MTY3MzYzODAzM30.mujrAw7CNe9GjlXdQ3rlaMhUs-AorT0SwdlBN2ZbRug"
            },
        });
        const json = await response.json();
        console.log(json);


        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)

    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {

        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjMTU1MWE1ZDFmNWI0NzBkMzA4ZjBjIn0sImlhdCI6MTY3MzYzODAzM30.mujrAw7CNe9GjlXdQ3rlaMhUs-AorT0SwdlBN2ZbRug"
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        // LOGIC to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (

        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;