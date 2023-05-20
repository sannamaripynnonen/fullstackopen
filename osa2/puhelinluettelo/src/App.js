import { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonForm = (props) => {
  return (
      <form onSubmit={props.submit} >
          <div>
              name: <input
                      value={props.name}
                      onChange={props.handleNameChange} 
                      />
          </div>
          <div>  
              number: <input
                      value={props.number}
                      onChange={props.handleNumberChange} 
                      />
          </div>
          <div>
              <button type="submit">add</button>
          </div>
      </form>
  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
      <div>
          {persons.map(person => 
          <Person key={person.name} name={person.name} number={person.number} buttonClick={() => deletePerson(person.id)} />  
          )}
      </div>
  )
}

const Person = ({ name, number, buttonClick }) => {
  return (
      <div>
      <p>{name} {number}
      <button onClick={buttonClick}>delete</button>
      </p>  
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
    
  const addPerson = (event) => {
      event.preventDefault()
      if ((persons.find(person => person.name === newName)) === undefined) {
        const personObject = {
          name: newName,
          number: newNumber,
        }
        personService
          .create(personObject)
          .then(returnedPersons => {
            setPersons(persons.concat(returnedPersons))
            setNewName('')
            setNewNumber('')
          })
        }
        else {
          alert(`${newName} is already added to phonebook`)
        }
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id);
    console.log(`deleting ${person.name}`)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .del(id)
        .then(()=> {
          setPersons(persons.filter(person => person.id !== id))
        })
      console.log(`person ${id} deleted successfully`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm persons={persons}
                  submit={addPerson}
                  newName={newName}
                  newNumber={newNumber}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  )

}

export default App