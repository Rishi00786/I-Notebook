import React, { useContext, useEffect, useRef, useState } from 'react'
import { NoteState } from '../context/Context'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {

  const a = useContext(NoteState);
  const { notes, getNotes , editNote} = a
  
  const refClose = useRef(null)
  const ref = useRef(null)

  const [note, setnote] = useState({eid : "" , etitle: "", edescription: "", etag: "" })

  const handleClick = (e) => {
    editNote(note.eid,note.etitle,note.edescription,note.etag)
    refClose.current.click();
  }

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({eid: currentNote._id , etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }

  const onChange = (e) => {

    setnote({ ...note, [e.target.name]: e.target.value })
  }

  

  useEffect(() => {
    localStorage.getItem('token') && getNotes()
  }, [])

  return (
    <>
      <AddNote />
      <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" minLength={3} required id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" required id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" minLength={1} required id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row my-3">
          <h3>Your Notes</h3>
          {notes.map((note) => {
            return <NoteItem edit={updateNote} note={note} key={note._id} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes
