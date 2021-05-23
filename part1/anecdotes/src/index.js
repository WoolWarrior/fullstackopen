import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const copy = [...points]
  const [mostVoted, setMostVoted] = useState(0)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>
        {props.anecdotes[selected]}
      </p>
      <p>
        {'has ' + points[selected] + ' voted'}
      </p>
      <Button handleClick={() => {
        copy[selected] += 1;
        setPoints(copy);
        let max = copy.indexOf(Math.max(...copy));
        setMostVoted(max);
        }} text={'vote'}/>
      <Button handleClick={() => {setSelected(Math.floor(Math.random() * 6))}} text={'next acecdote'}  />
      <h2>Anecdote with most votes</h2>
      <p>{props.anecdotes[mostVoted]}</p>
      <p>{'has ' + points[mostVoted] + ' voted'}</p>
      
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)