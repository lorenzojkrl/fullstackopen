import React, { useState, useEffect } from 'react';
import Country from "./Country";
import ShowButton from "./ShowCountry";
import Weather from "./Weather";
import getWeather from "../services/getWeather";

const Countries = ({ countries, filterCountry }) => {
    const [showComponent, setShowComponent] = useState(false)
    const [weather, setWeather] = useState("")

    useEffect(() => {
        getWeather()
            .then(response => setWeather(response))
    }, []);

    // counts the number of coutries filtered & save it to result
    let result = countries
        .filter(country =>
            country.name.toUpperCase().includes(filterCountry.toUpperCase()))
        .map(country => country.name)
        .length
    console.log("len of result", result)
    // console.log("showCountry state", showCountry)


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
                        <Weather country={country} weather={weather} />
                        {console.log("here is weather", weather)}
                    </div>
                ))}
        </div>
    );




};

export default Countries;