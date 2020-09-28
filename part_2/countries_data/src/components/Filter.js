import React from 'react';

// Component represents an input form
// Assign filterCountry to the value attribute (initialized to "")
// and trigger the handleFilter function

const Filter = ({ filterCountry, setFilter }) => {

    // Set the state of filterCountry to the value of the value attribute in the form 
    const handleFilter = event => {
        setFilter(event.target.value);
    };

    return (

        <div>Find Countries:
            <input
                type="text" // default
                value={filterCountry} // current value of the form & submitted with it 
                onChange={handleFilter}
            />
        </div>
    );
};

export default Filter;