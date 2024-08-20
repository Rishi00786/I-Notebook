import { useEffect, useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { NoteState } from './context/Context';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  const initial_notes = []
  const host = "http://localhost:3000"



  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Home /></>
    },
    {
      path: ("/about"),
      element: <><Navbar /><About /></>
    },
    {
      path: ("/login"),
      element: <><Navbar /><Login /></>
    },
    {
      path: ("/signup"),
      element: <><Navbar /><Signup /></>
    },
  ]);

  const getNotes = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/notes/getnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'AuthToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNWU5ZmE0ZWY0NmFiZjhmZWFjZjZlIn0sImlhdCI6MTcwOTU2Njk3NX0.A2TrpDIHOuvoKUJHVYtqEpZV4rzUnxR9A3zJas87mjc'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }

      const json = await response.json();
      console.log(json);
      setnotes(json);
    } catch (error) {
      console.error('Error fetching notes:', error.message);
    }
  }


  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "AuthToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNWU5ZmE0ZWY0NmFiZjhmZWFjZjZlIn0sImlhdCI6MTcwOTU2Njk3NX0.A2TrpDIHOuvoKUJHVYtqEpZV4rzUnxR9A3zJas87mjc"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json()
    setnotes(notes.concat(json))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "AuthToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNWU5ZmE0ZWY0NmFiZjhmZWFjZjZlIn0sImlhdCI6MTcwOTU2Njk3NX0.A2TrpDIHOuvoKUJHVYtqEpZV4rzUnxR9A3zJas87mjc"
        }
      });
        const json = await response.json();
        console.log(json)

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "AuthToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNWU5ZmE0ZWY0NmFiZjhmZWFjZjZlIn0sImlhdCI6MTcwOTU2Njk3NX0.A2TrpDIHOuvoKUJHVYtqEpZV4rzUnxR9A3zJas87mjc"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json)

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }

    }
    }  
    setnotes(newNotes);
  }

  const [notes, setnotes] = useState(initial_notes)



  return (
    <>
      <NoteState.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
        <RouterProvider router={router} />
      </NoteState.Provider>
    </>
  )
}

export default App
