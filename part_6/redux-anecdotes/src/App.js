import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  // The component can access the anexdotes stored in the store 
  // with the useSelector-hook of the react-redux library.
  const dispatch = useDispatch()
  // The useDispatch-hook provides any React component access to the dispatch-function of the redux-store defined in index.js. 
  // This allows all components to make changes to the state of the redux-store.

  // Use dispatch-function from the useDispatch -hook, instead of redux-store

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const create = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="newAnecdote" /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App