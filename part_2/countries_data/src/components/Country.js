import React from "react";
import Weather from "./Weather";


const Country = ({ country }) => {
    return (
        <div>
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
            <Weather capital={country.capital} />

        </div>
    );
};

export default Country;
