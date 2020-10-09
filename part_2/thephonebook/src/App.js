import React, { useState, useEffect } from 'react'
import DisplayContact from "./components/DisplayContact"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import personsService from "./services/personsService"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setShowFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll() // calls axios.get passing url, , returns response.data
      .then(dbData => {
        setPersons(dbData) // Assigns persons in db.json to persons
      })
  }, [])


  const addContact = event => {
    event.preventDefault()
    const contactObj = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(contactObj)  // calls axios.post passing url and contactObj, returns response.data
      .then(returnedContact => {
        setNewName('')
        setNewNumber('')
        setPersons(persons.concat(returnedContact))
      })
  }

  const removeContact = event => {
    event.preventDefault()
    // Change to name of the contact to be deleted!

    let deleteThis = persons.find(person => person.id === Number(event.target.value))

    let delConfirmed = window.confirm(`Delete ${deleteThis.name}`)
    // console.log(delConfirmed)
    if (delConfirmed) {
      // console.log(`remove ${event.target.value}`)

      personsService
        .remove(event.target.value)
        .then(outcome => {
          // console.log(outcome) // confirm deletion in console
          // Fetch everything from db.json again, not efficient but re-render component immediately after .delete
          personsService
            .getAll() // calls axios.get passing url, , returns response.data
            .then(dbData => {
              setPersons(dbData) // Assigns persons in db.json to persons
            })
        })
        .catch(error => {
          console.log('fail')
        })
    }
    // setNewName(' ')
    // setPersons(persons)


  }

  const handleNewName = event => {
    setNewName(event.target.value)
  }

  const handleNewNumber = event => {
    setNewNumber(event.target.value)
  }

  const isDuplicate = persons.filter(person => person.name === newName);
  if (isDuplicate.length !== 0) {
    window.alert(`${newName} is already added to phonebook`)
    setNewName('')
  }

  const handleFilter = event => {
    setShowFilter(event.target.value)
  }

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
      <DisplayContact
        persons={contactsToShow}
        removeContact={removeContact}
      />


    </div>
  )
}

export default App