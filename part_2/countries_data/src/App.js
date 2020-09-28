import React, { useState, useEffect } from 'react';
import Filter from "./components/Filter"
import axios from 'axios';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)

      })
  }, [])
  console.log(`initial render: ${countries.length} countries `)


  return (
    <div>
      <Filter />
    </div>
  );
}

export default App;
