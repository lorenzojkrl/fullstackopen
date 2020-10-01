import React from 'react';

const Weather = ({ country, weather }) => {
    return (
        <div>
            <h3>Weather in {country.capital} </h3>
            <p>Temperature: {weather.current.temperature} Celsius</p>
            <p>Wind: {weather.current.wind_speed} mph, direction {weather.current.wind_dir} </p>
        </div>
    );
};

export default Weather;