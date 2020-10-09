import React, { useState } from 'react'
import DisplayContact from "./components/DisplayContact"

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: 11223344,
      id: 'Artooooo'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


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

  return (
    <div>
      <h2>Phonebook</h2>
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

      <DisplayContact persons={persons} />
      <br></br>
      <div>debug2: {newName}</div>
    </div>
  )
}

export default App