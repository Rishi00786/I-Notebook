import React from 'react'
import { useContext } from 'react';
import { NoteState } from '../context/Context';

const NoteItem = (props) => {

    const a = useContext(NoteState);

    const handleonEdit=()=>{
        props.edit(props.note)
    }

    const handleonDelete=()=>{
        a.deleteNote(props.note._id)
    }

    return (
        <div className="col-md-3"> 
            <div className="card my-3"> 
                <div className="card-body">
                <h5 className="card-title">{props.note.title}</h5>
                <p className="card-text">{props.note.description}</p> 
                <div className='d-flex gap-3'>
                <i role="button" onClick={handleonDelete} className="fa-solid fa-trash"></i>
                <i role="button" onClick={handleonEdit} className="fa-solid fa-pen-to-square"></i>
                </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
