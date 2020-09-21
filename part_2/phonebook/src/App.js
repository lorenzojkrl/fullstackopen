import React, { useState } from 'react'
import Name from "./components/Name"
import Check from "./components/Check"



const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: newName,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p>Filter names goes here</p>
      <h3>Add a new</h3>
      <Check persons={persons} newName={newName} setNewName={setNewName} />

      <form onSubmit={addName}>
        <div>name: <input
          value={newName}
          onChange={handleNameChange}
        />
        </div>
        <div>number: <input
          value={newNumber}
          onChange={handleNumberChange}
        /></div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>




      <h2>Numbers</h2>
      { persons.map(person => <Name key={person.name} newName={person.name} newNumber={person.number} />)}

    </div >
  )
}

export default App