import React from 'react';
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value
    const createdAnecdote = await anecdoteService.createAnecdote(anecdote)

    dispatch(createAnecdote(createdAnecdote))
    dispatch(setNotification(`New anecdote created: ${createdAnecdote.content}`))

    // This could use setNotification, at this stage
    setTimeout(() => {
      dispatch(removeNotification(''))
    }, 5000)

    event.target.anecdote.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name='anecdote'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;