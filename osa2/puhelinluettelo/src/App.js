import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

    
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