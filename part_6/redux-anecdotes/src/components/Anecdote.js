import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

import { useDispatch } from 'react-redux'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = async anecdoteVoted => {
    dispatch(voteAnecdote(anecdoteVoted))
    dispatch(setNotification(`You voted: ${anecdoteVoted.content}`, 5))

  }

  return (
    <div>
      <b>{anecdote.content} </b>
        has {anecdote.votes} &nbsp;
      <button onClick={() => vote(anecdote)}> vote </button>
    </div>
  )
}

export default Anecdote;