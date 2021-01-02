import React from 'react';
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { toggleNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
    // const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        // dispatch(createAnecdote(content))
        // dispatch(toggleNotification(`New anecdote: ${content}`, 3))
        props.createAnecdote(content)
        props.toggleNotification(`New anecdote: ${content}`, 3)
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={create}>
                <div><input name="newAnecdote" /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    );
};

// export default AnecdoteForm;

export default connect(
    null,
    { createAnecdote, toggleNotification }
)(AnecdoteForm)