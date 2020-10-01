import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY
const fetchWeather = capital => {
    return `http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`;
}

const getWeather = capital => {
    const response = axios.get(fetchWeather(capital));
    return response.then(response => response.data);
};

export default getWeather;