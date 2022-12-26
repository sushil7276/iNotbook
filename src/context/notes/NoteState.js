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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5Y2NhZWEyYzYzNDFhMzdkMzM4MjFmIn0sImlhdCI6MTY3MTIyMzgyMn0.ywV9Glbou9wB1ier2h3ftKB6D4y3GZwAjrVvfSM71Zc"
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5Y2NhZWEyYzYzNDFhMzdkMzM4MjFmIn0sImlhdCI6MTY3MTIyMzgyMn0.ywV9Glbou9wB1ier2h3ftKB6D4y3GZwAjrVvfSM71Zc"
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);

        const note = {
            "_id": "63a2a08d53bf217cf38854069e",
            "user": "639ccaea2c6341a37d33821f",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-12-21T06:33:57.209Z",
            "__v": 0
        }
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5Y2NhZWEyYzYzNDFhMzdkMzM4MjFmIn0sImlhdCI6MTY3MTIyMzgyMn0.ywV9Glbou9wB1ier2h3ftKB6D4y3GZwAjrVvfSM71Zc"
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
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5Y2NhZWEyYzYzNDFhMzdkMzM4MjFmIn0sImlhdCI6MTY3MTIyMzgyMn0.ywV9Glbou9wB1ier2h3ftKB6D4y3GZwAjrVvfSM71Zc"
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);

        // LOGIC to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }
    }

    return (

        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;