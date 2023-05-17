const Course = ({ course }) => {
    return (
      <div>
          <Header name={course.name} />
          <Content parts={course.parts}/>
      </div>
    )
  }
  
const Header = ({ name }) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
}
  
const Content = ({ parts }) => {
    const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0);
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />  
        )}
        <p>total of {total} exercises</p>
      </div>
    )
}
  
const Part = ({ part }) => {
    return (
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
    )
}

export default Course
