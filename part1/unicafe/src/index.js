import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => <div>{props.value}</div>

const Button = (props) => {
  return (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const Statistic = (props) => {
  
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = good + neutral + bad;
  const average = (good - bad)/all;
  const positive = (good)/(good + neutral + bad)*100;

  if(all > 0) {
    return (
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={all} />
          <Statistic text='average' value={average} />
          <Statistic text='positive' value={positive} />
        </tbody>
      </table>

    )
  }
  return (
    <div>
      <Display value={'No feedback given'}/>
    </div>
  )

}

const App = () => {
  const title1 = 'give feedback'
  const title2 = 'statistics'
  const buttonText1 = 'good'
  const buttonText2 = 'neutral'
  const buttonText3 = 'bad'
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Display value={title1} />
      <Button handleClick={() => setGood(good + 1)} text={buttonText1}  />
      <Button handleClick={() => {setNeutral(neutral + 1);}} text={buttonText2}/>
      <Button handleClick={() => {setBad(bad + 1);}} text={buttonText3}/>
      <Display value={title2} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)