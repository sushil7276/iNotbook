import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

export const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {

        e.preventDefault();  // page is not reload for this code
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Added Successfully","success")
    }

    const onChaneg = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="container my-3">
                <h2>Add Note</h2>
                <form className='mx-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" value={note.title} id="title" name='title' aria-describedby="emailHelp" onChange={onChaneg} minLength={5} required />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" value={note.description} id="description" name='description' onChange={onChaneg} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" value={note.tag} id="tag" name='tag' onChange={onChaneg} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}