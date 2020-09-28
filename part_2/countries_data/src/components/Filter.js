import React from 'react';

const Filter = () => {

    const handleFilterContact = (event) => {
        event.preventDefault()
        // setFilter(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
        // console.log("filterName ", filterName)

    }

    return (
        <div>Find Countries: <input
            type="text"
        // onChange={handleFilterContact}
        />
        </div>
    );
};

export default Filter;