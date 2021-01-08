import React, { useState, useEffect } from 'react';
import getWeather from "../services/getWeather";


const Weather = ({ capital }) => {
    const [weather, setWeather] = useState([])
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        getWeather(capital)
            .then(data => {
                setHasData(true)
                setWeather({
                    temperature: data.current.temperature,
                    icon: data.current.weather_icons[0],
                    windSpeed: data.current.wind_speed,
                    windDirection: data.current.wind_dir
                })
            })
    }, []);


    return hasData ? (
        <div>
            <h3>Weather in {capital} </h3>
            <p>Temperature: {weather.temperature} Celsius</p>
            <p><img src={weather.icon} alt="icon" /></p>
            <p>Wind: {weather.windSpeed} mph, direction {weather.windDirection} </p>
        </div>
    ) : null;
};

export default Weather;