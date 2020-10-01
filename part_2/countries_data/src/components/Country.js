import React from "react";


const Country = ({ country }) => {
    return (
        <div>
            {console.log('Inside Country:', country.name)}
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Spoken Languages: </h3>
            <ul>
                {country.languages.map(language => (
                    <li key={language.name}>{language.name}</li>
                ))}
            </ul>

            <img
                src={country.flag}
                alt="No flag found"
                height="150"
                width="250"
            />

        </div>
    );
};

export default Country;
