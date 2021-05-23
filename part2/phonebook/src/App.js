import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import Notification from './component/Notification'

const Persons = ({personsToShow,handleRemovePerson}) => {
  return (
    <div>
      {personsToShow.map((person,index) => <p key={index}>{person.name} {person.number} 
      <button value={person.id} onClick={handleRemovePerson}>Delete</button></p>)}
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input value={props.searchName} onChange={props.handleSearchNameChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit = {props.addPerson}>
    <div>
      name: 
      <input value={props.newName} onChange={props.handleNameChange}/>
      number:
      <input value={props.newNumber} onChange={props.handleNumberChange}/>
    </div>
    <div>
      <button type="submit" >add</button>
    </div>
  </form>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchName, setSearchName] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ message, setMessage] = useState(null)

  useEffect(() => {
    personsService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    let id;
    const repeated = persons.reduce((s,p) => {
      let repeatedResult
      if(p.name === newName) {
        repeatedResult = true;
        id = p.id
      } else {
        repeatedResult = s
      }
      return repeatedResult
    },false)

    if(repeated) {
      if(window.confirm(`Replace ${newName}'s number?`)){
        const personObject = {
          id: id,
          name: newName,
          number: newNumber,
        }
        personsService
        .put(personObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        })
        .then(message => {
          setMessage(`Added '${newName}'`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMessage(
            `error: '${newName}' was already removed from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => (p.id != id)))
        })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .then(message => {
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
    setShowAll(false)
  }

  const handleRemovePerson = (event) => {
    let id = event.target.value
    let personToDelete = persons.filter(p => p.id == id)
    let nameToDelete = personToDelete[0].name
    if(window.confirm(`Delete ${nameToDelete}`)){
      personsService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(p => (p.id != id)))
      })
    }
  }

  const personsToShow = showAll 
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message ={message} />
      <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange}/>
      <h2>Add a new</h2>
      <PersonForm addPerson = {addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleRemovePerson={handleRemovePerson}/>
    </div>
  )
}

export default App