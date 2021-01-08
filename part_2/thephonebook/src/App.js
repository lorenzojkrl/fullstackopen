import React, { useState, useEffect } from 'react'
import DisplayContact from "./components/DisplayContact"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import personsService from "./services/personsService"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setShowFilter] = useState('')
  const [notification, setNotification] = useState('')
  const [isSuccessful, setSuccess] = useState(true)

  useEffect(() => {
    personsService
      .getAll()
      .then(dbData => {
        setPersons(dbData)
      })
  }, [])


  const addContact = event => {
    event.preventDefault()
    const contactObj = {
      name: newName,
      number: newNumber
    }

    const isNameDuplicate = persons.filter(person => person.name === newName);
    const found = persons.find(element => element.name === newName);
    if (isNameDuplicate.length !== 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(found.id, contactObj)
          .then(returnedContact => {
            personsService
              .getAll() // calls axios.get passing url, , returns response.data
              .then(dbData => {
                setPersons(dbData) // Assigns persons in db.json to persons
                setNewName('')
                setNewNumber('')
                setNotification(`${newName} number updated`)
                setTimeout(() => {
                  setNotification('')
                }, 3000);
              })
              .catch(err => {
                console.log("Error, no data from server")
              })
          })
      }
    } else {
      personsService
        .create(contactObj)  // calls axios.post passing url and contactObj, returns response.data
        .then(returnedContact => {
          setNewName('')
          setNewNumber('')
          setPersons(persons.concat(returnedContact))
          setSuccess(true)
          setNotification(`Added ${contactObj.name}`)
          setTimeout(() => {
            setNotification('')
          }, 3000);
        })
        .catch(err => {
          console.log(`Here: ${JSON.stringify(err.response.data)}`)

          setSuccess(false)
          setNotification(` ${JSON.stringify(err.response.data)} `)
          setTimeout(() => {
            setNotification('')
          }, 3000);
        })
    }


  }

  const removeContact = event => {
    event.preventDefault()
    let deleteThis = persons.find(person => Number(person.id) === Number(event.target.value))

    let delConfirmed = window.confirm(`Delete ${deleteThis.name}`)
    if (delConfirmed) {
      personsService
        .remove(event.target.value)
        .then(outcome => {
          // Fetch everything from db.json again, not efficient but re-render component immediately after .delete
          personsService
            .getAll() // calls axios.get passing url, , returns response.data
            .then(dbData => {
              setPersons(dbData) // Assigns persons in db.json to persons
            })
        })
        .catch(error => {
          setSuccess(false)
          setNotification(`Info on ${deleteThis.name} has already been removed`)
          setTimeout(() => {
            setNotification('')
          }, 3000);
          console.log('fail', error)
        })
    }
  }

  const handleNewName = event => {
    setNewName(event.target.value)
  }

  const handleNewNumber = event => {
    setNewNumber(event.target.value)
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
      <Notification message={notification} isSuccessful={isSuccessful} />
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