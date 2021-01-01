import React from 'react';

const Anecdote = ({ anecdote, vote }) => {
    // console.log('anecdotes in Anecdote component:', anecdote);
    // console.log(typeof (anecdote));

    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
    );
};

export default Anecdote;
