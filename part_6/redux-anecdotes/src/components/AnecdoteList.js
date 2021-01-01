import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { toggleNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filterReducer === '') {
      return state.anecdotes
    }

    let filteredAnecdotes = state.anecdotes.filter(anecdote => {
      return anecdote.content.includes(state.filterReducer)
    })

    return filteredAnecdotes
  })

  // console.log(state)
  // The component can access the anexdotes stored in the store 
  // with the useSelector-hook of the react-redux library.
  const dispatch = useDispatch()
  // The useDispatch-hook provides any React component access to the dispatch-function of the redux-store defined in index.js. 
  // This allows all components to make changes to the state of the redux-store.

  // Use dispatch-function from the useDispatch -hook, instead of redux-store

  const vote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(toggleNotification(anecdote.content))
  }

  return (
    <div>
      {
        anecdotes
          .sort((a, b) => (a.votes > b.votes) ? -1 : 1)
          .map(anecdote =>
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              vote={vote}
            />
          )

      }
    </div>
  );
};

export default AnecdoteList;