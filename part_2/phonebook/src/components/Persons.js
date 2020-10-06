import React from 'react';
import personService from "../services/personBackEnd"


const Persons = ({ filterName, persons, setPersons, setFilter }) => {

    const handleDeletion = person => {
        // console.log(`${person.id} to be deleted`)
        if (window.confirm(`Delete ${person.name}?`)) {
            const personFound = persons.find(guy => guy.id === person.id)
            console.log(`personFound: ${personFound.name} id: ${personFound.id}`)

            personService
                .update(personFound.id)
        }
        personService
            .getAll()
            .then(initialPersons => {
                // console.log('promise fulfilled')
                setPersons(initialPersons)
                setFilter(initialPersons)
            })

    }

    return (
        <div>
            {filterName.map(person => <div key={person.name}>
                {person.name}: {person.number}
                <button onClick={() => handleDeletion(person)}>Delete</button>
            </div>)}
        </div>
    );
};

export default Persons;