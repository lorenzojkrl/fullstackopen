import React, { useState } from 'react'
import Name from "./components/Name"
import Filter from "./components/Filter"



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault() // The default action submits a form & cause the page to reload.
    const nameObject = {
      name: newName,
      id: newName,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} newName={newName} setNewName={setNewName} />
      <form onSubmit={addName}>
        <div>name: <input
          value={newName}
          onChange={handleNameChange}
        />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      { persons.map(person => <Name key={person.name} newName={person.name} />)}

    </div >
  )
}

export default App