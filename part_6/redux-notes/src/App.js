import React, { useEffect } from 'react'
import NewNote from './NewNote'
import Notes from './Notes'
import VisibilityFilter from './components/VisibilityFilter'

import noteService from './services/notes'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    noteService
      .getAll()
      .then(notes => dispatch(initializeNotes(notes)))
  }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps  
  // another way to silence eslint

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App