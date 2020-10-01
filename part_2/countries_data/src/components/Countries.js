import React, { useState } from 'react';
import Country from "./Country";
import ShowButton from "./ShowCountry";

const Countries = ({ countries, filterCountry }) => {
    const [showComponent, setShowComponent] = useState(false)

    // counts the number of coutries filtered & save it to result
    let result = countries
        .filter(country =>
            country.name.toUpperCase().includes(filterCountry.toUpperCase()))
        .map(country => country.name)
        .length

    if (result >= 250) {
        return (
            <div>
                <p>Start by typing the name of the country</p>
            </div>
        );
    } else if (result === 0) {
        return (
            <div>
                <p>No country found with {filterCountry} name</p>
            </div>
        )
    } else if (result > 10) {
        return (
            <div>
                <p>There are too many matches. Specify another filter, please.</p>
            </div>
        );
    } else if (result > 1) {
        return (
            <ul>
                {countries
                    .filter(country =>
                        country.name.toUpperCase().includes(filterCountry.toUpperCase())
                    )
                    .map(country => (
                        <li key={country.name}>
                            <ShowButton
                                country={country}
                                showComponent={showComponent}
                                setShowComponent={setShowComponent}
                            />
                        </li>
                    ))}
            </ul>
        );
    }
    return (
        <div>
            {countries
                .filter(country =>
                    country.name.toUpperCase().includes(filterCountry.toUpperCase())
                )
                .map(country => (
                    <div key={country.name}>
                        <Country country={country} />
                    </div>
                ))}
        </div>
    );




};

export default Countries;