import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      let newState = state.map(anecdote => {
        if (anecdote.id === action.payload.id) {
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

export const voteAnecdote = anecdoteVoted => {
  return async dispatch => {
    const voted = await anecdoteService.updateAnecdote(anecdoteVoted)
    dispatch({
      type: 'VOTE',
      payload: voted
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const createdAnecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'CREATE',
      payload: createdAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      payload: anecdotes
    })
  }
}

export default reducer