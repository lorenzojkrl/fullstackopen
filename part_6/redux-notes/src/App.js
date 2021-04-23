import React, { useEffect } from 'react'
import NewNote from './NewNote'
import Notes from './Notes'
import VisibilityFilter from './components/VisibilityFilter'

// import noteService from './services/notes' r-thunk makes this unnecessary
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()


  // Before redux-thunk
  // communication with the server happens inside the functions of the components. 
  // It would be better if the communication could be abstracted away from the components, 
  // such that they don't have to do anything else but call the appropriate action creator

  // useEffect(() => {
  //   noteService
  //     .getAll()
  //     .then(notes => dispatch(initializeNotes(notes)))
  // }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps  
  // another way to silence eslint

  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App