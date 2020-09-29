import React, { useState } from 'react';
import Country from "./Country";

const ShowCountry = ({ country }) => {
    const [showComponent, setShowComponent] = useState(false)

    const handleClickShow = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)

        setShowComponent(true)
    }

    return (
        <div>
            {country.name}
            <button onClick={handleClickShow}>show</button>
            {showComponent ?
                <Country country={country} /> :
                null
            }

        </div>
    );
};

export default ShowCountry;