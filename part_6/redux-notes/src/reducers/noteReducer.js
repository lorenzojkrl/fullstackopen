import noteService from '../services/notes'

// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1,
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2,
//   },
// ]

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE': {
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
    }
    case 'INIT_NOTES':
      return action.data
    default:
      return state
  }
}

// const generateId = () =>
//   Math.floor(Math.random() * 1000000)

// action creator
// export const createNote = data => {
//   return {
//     type: 'NEW_NOTE',
//     data,
// backend generates id & noteService shapes the object
// data: {
//   content,
//   important: false,
//   id: generateId()
// }
//   }
// }

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: newNote,
    })
  }
}


// action creator
export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

// Without redux-thunk
// export const initializeNotes = (notes) => {
//   return {
//     type: 'INIT_NOTES',
//     data: notes,
//   }
// }


// Thanks to redux-thunk, it is possible to define action creators 
// so that they return a function having the dispatch-method of redux-store as its parameter. 
// So, one can make asynchronous action creators, 
// which first wait for some operation to finish, 
// after which they then dispatch the real action.

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    })
  }
}

export default noteReducer