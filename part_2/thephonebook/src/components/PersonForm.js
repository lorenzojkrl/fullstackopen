import React from 'react';

const PersonForm = ({ addContact, newName, handleNewName, newNumber, handleNewNumber }) => {
    return (
        <form onSubmit={addContact}>
            <div>
                Name: <input
                    value={newName}
                    onChange={handleNewName}
                />
            </div>
            <div>
                Number: <input
                    value={newNumber}
                    onChange={handleNewNumber}
                />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};

export default PersonForm;