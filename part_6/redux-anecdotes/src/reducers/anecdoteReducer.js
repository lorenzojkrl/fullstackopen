// From db.json
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'ADD_ONE_VOTE':
      const id = action.data.id
      const votedAnecdote = state.find(n => n.id === id)
      votedAnecdote.votes += 1

      return state.map(a =>
        a.id !== id ? a : votedAnecdote
      )
    case 'CREATE_ANECDOTE':
      const content = action.data.content
      let newAnecdote = asObject(content)
      // console.log('newAnecdote in reducer: ', newAnecdote);
      return state.concat(newAnecdote)

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

// Functions that create actions: action creators
export const voteAnecdote = (id) => {
  // alert(`in vote action creator with id ${id}`)
  return {
    type: 'ADD_ONE_VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  // alert(`in createAnecdote action creator with content`)
  return {
    type: 'CREATE_ANECDOTE',
    data: { content }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default anecdoteReducer