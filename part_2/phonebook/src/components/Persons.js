import React from 'react';

const Persons = ({ persons }) => {

    return (
        <div>
            {persons.map(person => <div>{person.name} {person.number}</div>)}
        </div>
    );
};

export default Persons;