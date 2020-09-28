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

  console.log(`initial render of countries: ${countries.length} persons `)
  console.log(`initial render of filterCountry: ${filterCountry.length} persons `)

  // 



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
