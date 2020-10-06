import React, { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import axios from 'axios';



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState([])


  useEffect(() => {
    // console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // console.log('promise fulfilled')
        setPersons(response.data)
        setFilter(response.data)
      })
  }, [])
  // This is to understand how axios and promises work
  // console.log(`initial render of persons: ${persons.length} persons `)
  // console.log(`initial render of filterName: ${filterName.length} persons `)


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        persons={persons}
        filterName={filterName}
        setFilter={setFilter}
        setPersons={setPersons}
      />
      <h3>Add a new</h3>

      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setFilter={setFilter}
      />
      <h2>Numbers</h2>
      <Persons filterName={filterName} />
    </div >
  )
}

export default App