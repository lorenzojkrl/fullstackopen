import React, { useState } from 'react'
import DisplayContact from "./components/DisplayContact"

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
      <div>
        Filter shown with: <input
          value={showFilter}
          onChange={handleFilter}
        />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addContact}>
        <div>
          Name: <input
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          Number: <input
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* Shows all the contacts in the array */}
      <DisplayContact persons={contactsToShow} />
      <br></br>
      <div>debug2: {newName}</div>
    </div>
  )
}

export default App