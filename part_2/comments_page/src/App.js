import React, { useState, useEffect } from 'react';
import Note from "./components/Note";
import noteService from "./services/notes"
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    // Before creating noteService module --------------------------------
    // 1) Using eventHandler
    // useEffect(() => {
    //     console.log('effect')

    //     const eventHandler = response => {
    //         console.log('promise fulfilled')
    //         setNotes(response.data)
    //     }

    //     const promise = axios.get('http://localhost:3001/notes')
    //     promise.then(eventHandler)
    // }, [])

    // 2) Using useEffect
    // useEffect(() => {
    //     console.log('effect')
    //     axios
    //         .get('http://localhost:3001/notes')
    //         .then(response => {
    //             console.log('promise fulfilled')
    //             setNotes(response.data)
    //         })
    // }, [])
    // console.log('render', notes.length, 'notes')

    // 3) Rewriting useEffect
    // const hook = () => {
    //     console.log('effect')
    //     axios
    //         .get('http://localhost:3001/notes')
    //         .then(response => {
    //             console.log('promise fulfilled')
    //             setNotes(response.data)
    //         })
    // }
    // useEffect(hook, [])


    // After creating noteService module --------------------------------
    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    const addNote = event => {
        event.preventDefault() // The default action submits a form & cause the page to reload.
        // console.log('button clicked', event.target)
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1 // better to let the server generate ids for our resources
        }

        // Before noteService module
        // axios
        //     .post('http://localhost:3001/notes', noteObject)
        //     .then(response => {
        //         console.log(response)
        //         setNotes(notes.concat(response.data))
        //         setNewNote('')
        //     })

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })

    }

    const toggleImportanceOf = id => {
        // console.log('importance of ' + id + ' needs to be toggled')
        // const url = `http://localhost:3001/notes/${id}` // unique url for each note resource based on its id. Before noteService
        const note = notes.find(n => n.id === id) // find the note we want to modify, and we then assign it to the note variable
        const changedNote = { ...note, important: !note.important } // create a new object that is an exact copy of the old note, apart from the important property.

        // Before noteService
        // axios.put(url, changedNote).then(response => {
        //     setNotes(notes.map(note => note.id !== id ? note : response.data))
        // })
        // noteService
        //     .update(id, changedNote)
        //     .then(returnedNote => {
        //         setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        //     })
        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })

    }

    const handleNoteChange = (event) => {
        // console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important) //  === true is redundant because note.important is either true or false

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map((note, i) =>
                    <Note
                        key={i}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
            <Footer />
        </div>
    );
};

export default App;