import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { AddNote } from './AddNote';
import { Noteitem } from './Noteitem';

export const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        
    }

    const handleClick = (e) => {
        console.log("Updating the note", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully","success")
    }

    const onChaneg = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-1">

                                <form className='mx-3'>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input type="text" value={note.etitle} className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChaneg} minLength={5} required/>

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Description</label>
                                        <input type="text" value={note.edescription} className="form-control" id="edescription" name='edescription' onChange={onChaneg} minLength={5} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Tag</label>
                                        <input type="text" value={note.etag} className="form-control" id="etag" name='etag' onChange={onChaneg} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3">
                <h2>Your Notes</h2>
                <h6>{notes.length === 0 && "No notes to Display"}</h6>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                })}
            </div>
        </>
    )
}