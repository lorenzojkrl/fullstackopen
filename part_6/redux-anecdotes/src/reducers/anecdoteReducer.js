import { initialState, asObject } from './store'

const reducer = (state = initialState, action) => {
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
      return [...state, asObject(action.payload)]
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

export default reducer