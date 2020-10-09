import React, { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
// import axios from 'axios';
import personService from "./services/personBackEnd"
import Notification from './components/Notification';




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)


  useEffect(() => {
    // console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        // console.log('promise fulfilled')
        setPersons(initialPersons)
        setFilter(initialPersons)
      })
  }, [])
  // This is to understand how axios and promises work
  // console.log(`initial render of persons: ${persons.length} persons `)
  // console.log(`initial render of filterName: ${filterName.length} persons `)


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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
        setNotificationMessage={setNotificationMessage}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        filterName={filterName}
        setFilter={setFilter}
      />
    </div >
  )
}

export default App