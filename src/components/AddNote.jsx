import React from 'react'
import { useContext , useState } from 'react'
import { NoteState } from '../context/Context'

const AddNote = () => {

    const a = useContext(NoteState);
    // const {addNote} = a

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleOnAdd=(e)=>{
        e.preventDefault();
        a.addNote(note.title, note.description, note.tag);
        // setNote({title: "", description: "", tag: ""})
    }

    const handleOnChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <div className="container my-3">
        <h1>Make a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' minLength={3} value={note.title} required onChange={handleOnChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description"  className="form-label">Description</label>
            <input type="text" className="form-control" name='description'  value={note.description} required id="description" onChange={handleOnChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag"  className="form-label">Tag</label>
            <input type="text" className="form-control" name='tag' minLength={1} value={note.tag} required id="tag" onChange={handleOnChange}/>
          </div>
          <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleOnAdd}>Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
