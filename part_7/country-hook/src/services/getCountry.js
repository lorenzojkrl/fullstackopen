import axios from "axios";

const fetchCountry = name => {
    return `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;
}

const getCountry = async (name) => {
    const response = await axios.get(fetchCountry);
    return response.then(response => console.log(response.data));
};

export default getCountry;
