import React from 'react';
import { connect } from 'react-redux'
// import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value

    // dispatch(createAnecdote(anecdote))
    // dispatch(setNotification(`New anecdote created: ${anecdote}`, 10))
    props.createAnecdote(anecdote)
    props.setNotification(`New anecdote created: ${anecdote}`, 5)

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

// export default AnecdoteForm;

const ConnectedAnecdoteForm = connect(
  null,
  {
    createAnecdote,
    setNotification
  }
)(AnecdoteForm)

export default ConnectedAnecdoteForm