import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = async anecdoteVoted => {
    const anecdoteVoteUpdated = await anecdoteService.updateAnecdote(anecdoteVoted)
    console.log('anecdoteVoteUpdated', anecdoteVoteUpdated);

    dispatch(voteAnecdote(anecdoteVoteUpdated.id))
    dispatch(setNotification(`You voted: ${anecdoteVoteUpdated.content}`))

    // This could use setNotification, at this stage
    setTimeout(() => {
      dispatch(removeNotification(''))
    }, 5000)
  }

  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </>
  )
}

export default Anecdote;