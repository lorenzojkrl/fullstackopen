import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { toggleNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    // console.log(anecdote);

    dispatch(toggleNotification(`You voted:  ${anecdote.content}`))
    setTimeout(() => { dispatch(clearNotification()) }, 5000)

    dispatch(voteAnecdote(anecdote.id))
  }

  return (
    <div>
      {
        state.anecdotes
          .filter(a => state.filter ? a.content.toLowerCase().includes(state.filter.toLowerCase()) : a)
          .sort((a, b) => a.votes > b.votes ? -1 : 1)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )
      }
    </div>
  );
};

export default AnecdoteList;