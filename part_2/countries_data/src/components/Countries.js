import React from 'react';

const Countries = ({ countries, filterName }) => {
    return (
        <ul>
            {countries.map(country => <li key={country.alpha3Code}>{country.name}</li>)}
        </ul>
    );
};

export default Countries;