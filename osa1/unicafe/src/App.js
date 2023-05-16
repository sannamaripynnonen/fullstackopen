import { useState } from 'react'

const Header = ({ header }) => {
  return (
  <div>
    <h1>{header}</h1>
  </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value, symbol }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {symbol}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  const average = (good * 1 + bad * (-1)) / total
  const positive = (good / total)*100
  return (
    <table>
      <tbody>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={total} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} symbol='%'/>
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header='give feedback' />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Header header='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App