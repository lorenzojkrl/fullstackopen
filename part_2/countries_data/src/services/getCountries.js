import axios from "axios";

const apiURL = "https://restcountries.eu/rest/v2/all";

const getCountries = async () => {
    const response = await axios.get(apiURL);
    return response.data;
};

export default getCountries;