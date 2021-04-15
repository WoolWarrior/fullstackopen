import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
// const AnecdoteForm = () => {
  // const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const text = event.target.textAnecdote.value
    event.target.textAnecdote.value = ''
    // dispatch(addAnecdote(text))
    // dispatch(setNotification(`${text} is added`, 5))
    props.addAnecdote(text)
    props.setNotification(`${text} is added`, 5)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="textAnecdote" /></div>
        <button>create</button>
      </form >
    </div>
  )
}

/** Code for using Connect */
const mapDispatchToProps = {
  addAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

// export default AnecdoteForm;
export default ConnectedAnecdoteForm