import React from 'react';

const Filter = ({ countries, setCountries, filter, setFilter }) => {

    const handleFilterContact = (event) => {
        event.preventDefault()
        setFilter(countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase())))
        // console.log("filterName ", filterName)

    }

    return (
        <div>Find Countries:
            <input
                type="text"
                onChange={handleFilterContact}
            />
        </div>
    );
};

export default Filter;