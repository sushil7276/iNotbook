import React, { useState } from 'react'
import NoteContext from './NoteContext'


export const NoteState = (props) => {
    const s1 = {
        "name": "Sushil",
        "class": "5b"
    }

    const [state, setstate] = useState(s1)
    const update = () => {
        setTimeout(() => {
            setstate({
                "name": "Said",
                "class": "MCA"
            })
        }, 1000);
    }



    return (

        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
