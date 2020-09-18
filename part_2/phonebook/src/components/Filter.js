import React from 'react';
// If Filter returns null, no JSX is used and no React, 
// comment import to mute warning React is not used

const Filter = ({ persons, newName, setNewName }) => {
    const result = persons.filter(person => person.name === newName);
    if (result.length !== 0) {
        window.alert(`${newName} is already added to phonebook`)
        setNewName('')
    }
    return (<div></div>);
};

export default Filter;