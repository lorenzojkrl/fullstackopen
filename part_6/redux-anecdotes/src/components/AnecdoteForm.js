import React from 'react';
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { toggleNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // The useDispatch hook provides any React component 
    // access to the dispatch function of the redux store defined in store.js. 
    // This allows all components to make changes to the state of the redux store.

    dispatch(toggleNotification(`New anecdote:  ${content}`))
    setTimeout(() => { dispatch(clearNotification()) }, 5000)

    dispatch(createAnecdote(content))
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name='anecdote' /></div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;