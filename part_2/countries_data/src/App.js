import React, { useState, useEffect } from 'react';
import Filter from "./components/Filter"
import getCountries from "./services/getCountries";
import './App.css';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilter] = useState("")

  useEffect(() => {
    getCountries()
      .then(response => setCountries(response))
  }, []);

  return (
    <div>
      <Filter
        filterCountry={filterCountry}
        setFilter={setFilter}
      />
      <Countries countries={countries} filterCountry={filterCountry} />
    </div>
  );
}

export default App;

// Get an api key from https://weatherstack.com/ and use it to start the app as follow
// REACT_APP_API_KEY='YOUR API KEY HERE' npm start 
