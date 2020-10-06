import React from 'react';

const Persons = ({ filterName }) => {

    return (
        <div>
            {filterName.map(person => <div key={person.name}>{person.name}: {person.number}</div>)}
        </div>
    );
};

export default Persons;