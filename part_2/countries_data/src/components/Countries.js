import React from 'react';
import Country from "./Country";
import ShowButton from "./ShowButton";

const Countries = ({ countries, filterCountry }) => {
    // const entries = countries.filter(country =>
    //     country.name.toUpperCase().includes(filterCountry.toUpperCase())
    // );

    // if (entries.length >= 10) {
    //     return <p>Too many matches, specify another filter</p>;
    // }
    // if (showCountry !== undefined) {
    //     return (
    //         <Country
    //             key={showCountry.name}
    //             name={showCountry.name}
    //             capital={showCountry.capital}
    //             population={showCountry.population}
    //             languages={showCountry.languages}
    //             flagUrl={showCountry.flag}
    //         />
    //     );
    // }
    // if (entries.length > 1) {
    //     return (
    //         <ul>
    //             {countries
    //                 .filter(country =>
    //                     country.name.toUpperCase().includes(filterCountry.toUpperCase())
    //                 )
    //                 .map(country => (
    //                     country.name
    //                 ))}
    //         </ul>
    //     );
    // }

    // counts the number of coutries filtered & save it to result
    let result = countries
        .filter(country =>
            country.name.toUpperCase().includes(filterCountry.toUpperCase()))
        .map(country => country.name)
        .length
    console.log("len of resault", result)

    if (result === 250) {
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

                        <li key={country.name}><ShowButton name={country.name} /></li>

                    ))}


            </ul>
        );
    }
    return (
        <ul>
            {countries
                .filter(country =>
                    country.name.toUpperCase().includes(filterCountry.toUpperCase())
                )
                .map(country => (
                    <Country key={country.name} country={country} />
                ))}
        </ul>
    );




};

export default Countries;