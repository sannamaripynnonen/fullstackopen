import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ({ persons }) => {
  return (
      <div>
          {persons.map(person => 
          <Person key={person.name} name={person.name} number={person.number} />  
          )}
      </div>
  )
}

const Person = ({ name, number }) => {
  return (
      <div>
      <p>{name} {number}</p>  
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  })
    
  const addPerson = (event) => {
      event.preventDefault()
      if ((persons.find(person => person.name === newName)) === undefined) {
        const personObject = {
          name: newName,
          number: newNumber,
        }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      }
      else {
        alert(`${newName} is already added to phonebook`)
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
      <Persons persons={persons} />
    </div>
  )

}

export default App