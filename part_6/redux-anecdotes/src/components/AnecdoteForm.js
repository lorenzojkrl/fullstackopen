import React from 'react';
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value

    dispatch(createAnecdote(anecdote))
    // Notification to use async action creator
    dispatch(setNotification(`New anecdote created: ${anecdote}`))

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