import React, { useState, useEffect } from 'react'
import DisplayContact from "./components/DisplayContact"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setShowFilter] = useState('')

  // Here is a promise
  // const promise = axios.get('http://localhost:3001/persons')
  // console.log(promise)
  // promise.then(response => console.log(response.data))

  // Using axios, update persons state fetching data from db.json
  // axios
  //   .get('http://localhost:3001/persons')
  //   .then(response =>
  //     setPersons(response.data)
  //   )

  // Using useEffect, update persons state fetching data from db.json
  useEffect(() => {
    // console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  // What happens in useEffect?
  // 1) the body of the function defining the component is executed 
  // and the component is rendered for the first time, therefore empty (persons.length = 0).
  // 2) the inner callback function is executed immediately after rendering
  // it prints 'effect' and initiate the fetching of data from the server (through axios.get)
  // it registers the next function (after .then) as an event handler
  // 3) When data arrives, JS calls the function registered as the event handler, 
  // which prints 'promise fulfilled'
  // and stores the data from the server into the state using setPersons(response.data)
  // a call to a state-updating function triggers the re-rendering of the component (persons.length = 4).
  // console.log('render', persons.length, 'contacts')
  // console.log('Indeed!')


  const addContact = event => {
    // prevents the default action of submitting a form, not in input
    event.preventDefault()
    // console.log('button clicked', event.target)
    const contactObj = {
      name: newName,
      number: newNumber
      // omit the id property, 
      // let the server generate ids for our resources
      // id: newName
    }

    axios
      .post('http://localhost:3001/persons', contactObj)
      .then(response => {
        setNewName('')
        setNewNumber('')
        setPersons(persons.concat(response.data))

      })
    // moved inside axios.then to re-render with the new contact after axios.post
    // Swap order to clean setNewName state to avoid raising duplicate alert 
    // setPersons(persons.concat(contactObj))
    // setNewName('')
    // setNewNumber('')
  }

  // Keep event handlers in App to move the setter higher

  // called every time a change occurs in the input element
  const handleNewName = event => {
    // console.log(" handleNewName", event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = event => {
    // console.log(" handleNewNumber", event.target.value)
    setNewNumber(event.target.value)
  }

  const isDuplicate = persons.filter(person => person.name === newName);
  if (isDuplicate.length !== 0) {
    window.alert(`${newName} is already added to phonebook`)
    setNewName('')
  }

  // Assing input value to setShowFilter to update the value of showFilter
  const handleFilter = event => {
    // console.log(" handleFilter", event.target.value)
    setShowFilter(event.target.value)
  }

  // if showFilter true, filter the contacts that contain the letters in showFilter (e.g. used to filter), else show all
  const contactsToShow = showFilter
    ? persons.filter(contact => contact.name.toLowerCase().includes(showFilter.toLowerCase()))
    : persons



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        showFilter={showFilter}
        handleFilter={handleFilter}
      />

      <h3>Add a new</h3>
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h3>Numbers</h3>
      {/* Shows all the contacts in the array */}
      <DisplayContact persons={contactsToShow} />


      <br />
      <div>debug2: {newName}</div>
    </div>
  )
}

export default App