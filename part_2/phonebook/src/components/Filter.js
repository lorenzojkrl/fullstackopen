import React from 'react';

const Filter = ({ persons, filterName, setFilter, setPersons }) => {
    const handleFilterContact = (event) => {
        event.preventDefault()
        setFilter(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
        console.log("filterName ", filterName)

    }

    return (
        <div>
            <div >Filter shown with: <input
                type="text"
                onChange={handleFilterContact}
            />
            </div>
        </div>
    );
};

export default Filter;

