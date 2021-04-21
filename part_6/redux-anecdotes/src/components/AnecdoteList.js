import React from 'react';

import Anecdote from './Anecdote'
import { useSelector } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)

  return (
    <>
      {
        anecdotes
          .sort((a, b) => (a.votes > b.votes) ? -1 : 1)
          .map(anecdote =>
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
            />
          )
      }
    </>
  );
};

export default AnecdoteList;