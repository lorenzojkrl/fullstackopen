import React, { useState } from 'react'
import DisplayContact from "./components/DisplayContact"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setShowFilter] = useState('')


  const addContact = event => {
    // prevents the default action of submitting a form, not in input
    event.preventDefault()
    console.log('button clicked', event.target)
    const contactObj = {
      name: newName,
      number: newNumber,
      id: newName
    }
    setPersons(persons.concat(contactObj))
    setNewName('')
    setNewNumber('')
  }

  // Keep event handlers in App to move the setter higher

  // called every time a change occurs in the input element
  const handleNewName = event => {
    console.log(" handleNewName", event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = event => {
    console.log(" handleNewNumber", event.target.value)
    setNewNumber(event.target.value)
  }

  const isDuplicate = persons.filter(person => person.name === newName);
  if (isDuplicate.length !== 0) {
    window.alert(`${newName} is already added to phonebook`)
    setNewName('')
  }

  // Assing input value to setShowFilter to update the value of showFilter
  const handleFilter = event => {
    console.log(" handleFilter", event.target.value)
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