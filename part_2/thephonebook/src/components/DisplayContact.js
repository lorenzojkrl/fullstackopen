import React from 'react';

const DisplayContact = ({ persons, removeContact }) => {

    return (
        <div >
            {persons.map(person => <div key={person.id}>
                {person.name}: {person.number} <button
                    type="submit"
                    value={person.id}
                    onClick={removeContact}>Delete</button>
            </div>)}

        </div>
    );
};

export default DisplayContact;