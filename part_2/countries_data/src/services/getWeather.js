import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY
const apiURL = `http://api.weatherstack.com/current?access_key=${apiKey}&query=Helsinki`

const getWeather = async () => {

    const response = await axios.get(apiURL);
    return response.data;
};

export default getWeather;