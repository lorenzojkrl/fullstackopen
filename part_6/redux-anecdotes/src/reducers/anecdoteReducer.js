// import { asObject } from './store'
// asObject(action.payload) was used to assign an id and create an object anecdote
// No the server assigns an id

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      let newState = state.map(anecdote => {
        if (anecdote.id === action.payload) {
          anecdote.votes += 1
        }
        return anecdote
      })
      return newState
    case 'CREATE':
      return [...state, action.payload]
    case 'INIT':
      return action.payload
    default:
      return state
  }
}

export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    payload: id
  }
}

export const createAnecdote = content => {
  return {
    type: 'CREATE',
    payload: content
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT',
    payload: anecdotes
  }
}

export default reducer