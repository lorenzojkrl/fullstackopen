import React, { useState } from 'react'
import DisplayContact from "./components/DisplayContact"

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      id: 'Artooooo'
    }
  ])
  const [newName, setNewName] = useState('')

  const addContact = event => {
    // prevents the default action of submitting a form, not in input
    event.preventDefault()
    console.log('button clicked', event.target)
    const contactObj = {
      name: newName,
      id: newName
    }
    setNewName('')
    setPersons(persons.concat(contactObj))
  }

  // called every time a change occurs in the input element
  const handleNewName = event => {
    console.log(" handleNewName", event.target.value)
    setNewName(event.target.value)
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
          name: <input
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <DisplayContact key={person.id} person={person} />
      )}
      <div>debug2: {newName}</div>
    </div>
  )
}

export default App