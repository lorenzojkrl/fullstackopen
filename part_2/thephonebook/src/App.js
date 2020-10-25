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
  const [isSuccessful, setSuccess] = useState(true) // this is used to select which notification class to use in Notification.js. Not efficient but it works, to be reviewed

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

    // Not so elegant, to be reviewed
    const isNameDuplicate = persons.filter(person => person.name === newName);
    const found = persons.find(element => element.name === newName);
    // console.log("found id: ", found.id)
    if (isNameDuplicate.length !== 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(found.id, contactObj)
          .then(returnedContact => {
            // Fetch everything from db.json again, not efficient but re-render component immediately after .update
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
              .catch(console.log("Error, no data from server"))
          })
          .catch(error => {
            setSuccess(false)
            setNotification(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setNotification('')
            }, 3000);
          })

      }
    } else {
      personsService
        .create(contactObj)  // calls axios.post passing url and contactObj, returns response.data
        .then(returnedContact => {
          setNewName('')
          setNewNumber('')
          setPersons(persons.concat(returnedContact))
          setNotification(`Added ${contactObj.name}`)
          setTimeout(() => {
            setNotification('')
          }, 3000);
          console.log(`${contactObj.name} added (in .then)`)
        })
        .catch(console.log("Failed addition (in .catch)"))
    }


  }

  const removeContact = event => {
    event.preventDefault()
    // Change to name of the contact to be deleted!
    // Remove Number() because id is generated as a number by DB
    // console.log(persons.find(person => person.id === event.target.value))
    let deleteThis = persons.find(person => person.id === event.target.value)
    // console.log(`${deleteThis.name} TO BE removed`)

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

  // Functionality changed to allow number updates
  // const isNameDuplicate = persons.filter(person => person.name === newName);
  // if (isNameDuplicate.length !== 0) {
  //   window.alert(`${newName} is already added to phonebook`)
  //   setNewName('')
  // }


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