import React from 'react';

const PersonForm = ({ persons, setPersons, newName, newNumber, setNewName, setNewNumber, setFilter }) => {
    const addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newNumber,
            id: newName,
        }
        setPersons(persons.concat(nameObject))
        setFilter(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        // console.log(event.target.value)
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        // console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const result = persons.filter(person => person.name === newName);
    if (result.length !== 0) {
        window.alert(`${newName} is already added to phonebook`)
        setNewName('')
    }

    return (
        <div>
            <form onSubmit={addName}>
                <div>name: <input
                    value={newName}
                    onChange={handleNameChange}
                />
                </div>
                <div>number: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                /></div>
                <div>
                    <button type="submit" >add</button>
                </div>
            </form>
        </div>
    );
};

export default PersonForm;