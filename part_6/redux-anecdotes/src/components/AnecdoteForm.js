import React from 'react';
import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { toggleNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        dispatch(createAnecdote(content))
        dispatch(toggleNotification(content))
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

export default AnecdoteForm;