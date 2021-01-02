import React from 'react';
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { toggleNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = (props) => {

  // Comments on useSelector & useDispatch
  // The component can access the anexdotes stored in the store 
  // with the useSelector-hook of the react-redux library.
  // const dispatch = useDispatch()
  // The useDispatch-hook provides any React component access to the dispatch-function of the redux-store defined in index.js. 
  // This allows all components to make changes to the state of the redux-store.
  // Use dispatch-function from the useDispatch -hook, instead of redux-store

  // Using useSelector
  // const anecdotes = useSelector(state => {
  //   if (state.filterReducer === '') {
  //     return state.anecdotes
  //   }

  //   let filteredAnecdotes = state.anecdotes.filter(anecdote => {
  //     return anecdote.content.includes(state.filterReducer)
  //   })

  //   return filteredAnecdotes
  // })

  // const anecdotesToShow = () => {
  //   if (!props.filter) {
  //     console.log('props.anecdotes:', props.anecdotes)
  //     return props.anecdotes
  //   }

  //   let filteredAnecdotes = props.anecdotes.filter(anecdote => {
  //     return anecdote.content.includes(props.filterReducer)
  //   })

  //   console.log('anecdotesToShow', filteredAnecdotes);
  //   return filteredAnecdotes
  // }

  const vote = async (anecdote) => {
    // dispatch(voteAnecdote(anecdote))
    // dispatch(toggleNotification(anecdote.content, 2))
    console.log('a voted:', anecdote);
  }

  return (
    <div>
      {
        props.anecdotes
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

const mapStateToProps = (state) => {
  if (!state.filter) {
    console.log('state.anecdotes:', state.anecdotes)
    return {
      anecdotes: state.anecdotes,
      filterReducer: state.filterReducer,
    }
  }

  let filteredAnecdotes = state.anecdotes.filter(anecdote => {
    return anecdote.content.includes(state.filterReducer)
  })

  console.log('anecdotesToShow', filteredAnecdotes);
  return {
    anecdotes: filteredAnecdotes,
    filterReducer: state.filterReducer,
  }
}

// export default AnecdoteList;
const ConnectedAnecdoteList = connect(mapStateToProps)(AnecdoteList)
export default ConnectedAnecdoteList


