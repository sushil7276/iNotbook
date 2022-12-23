import React, { useState } from 'react'
import NoteContext from './NoteContext'


export const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "639d95e451e66b261ca9ac3f",
            "user": "639ccaea2c6341a37d33821f",
            "title": "My Title",
            "description": "This is my discription",
            "tag": "Personal",
            "date": "2022-12-17T10:11:48.562Z",
            "__v": 0
        },
        {
            "_id": "639e3807f66d09d10a360dc9",
            "user": "639ccaea2c6341a37d33821f",
            "title": "Said Title",
            "description": "This is said description",
            "tag": "Personal",
            "date": "2022-12-17T21:43:35.631Z",
            "__v": 0
        },
        {
            "_id": "63a2a8d13bf217cf3885409c",
            "user": "639ccaea2c6341a37d33821f",
            "title": "Said Title update",
            "description": "This is said description update",
            "tag": "Personal",
            "date": "2022-12-21T06:33:53.131Z",
            "__v": 0
        },
        {
            "_id": "63a2a8d53bf217cf3885409e",
            "user": "639ccaea2c6341a37d33821f",
            "title": "Said Title update",
            "description": "This is said description update",
            "tag": "Personal",
            "date": "2022-12-21T06:33:57.209Z",
            "__v": 0
        },
        {
            "_id": "639d95e451e66b261ca9ac3f",
            "user": "639ccaea2c6341a37d33821f",
            "title": "My Title",
            "description": "This is my discription",
            "tag": "Personal",
            "date": "2022-12-17T10:11:48.562Z",
            "__v": 0
        },
        {
            "_id": "639e3807f66d09d10a360dc9",
            "user": "639ccaea2c6341a37d33821f",
            "title": "Said Title",
            "description": "This is said description",
            "tag": "Personal",
            "date": "2022-12-17T21:43:35.631Z",
            "__v": 0
        },
        {
            "_id": "63a2a8d13bf217cf3885409c",
            "user": "639ccaea2c6341a37d33821f",
            "title": "Said Title update",
            "description": "This is said description update",
            "tag": "Personal",
            "date": "2022-12-21T06:33:53.131Z",
            "__v": 0
        },
        {
            "_id": "63a2a8d53bf217cf3885409e",
            "user": "639ccaea2c6341a37d33821f",
            "title": "Said Title update",
            "description": "This is said description update",
            "tag": "Personal",
            "date": "2022-12-21T06:33:57.209Z",
            "__v": 0
        }
    ]

    const [notes, setnotes] = useState(notesInitial)

    return (

        <NoteContext.Provider value={{ notes, setnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
