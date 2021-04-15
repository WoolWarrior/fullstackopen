import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

/** Code for using Hook */
// const AnecdoteList = () => {
const AnecdoteList = (props) => {

  /** Code for using Hook */
  // const dispatch = useDispatch()
  // const anecdotes = useSelector(({anecdote, notification, filter}) => {
  //   if (filter === '') {
  //     return anecdote
  //   } else {
  //     return anecdote.filter((item) => item.content.toLowerCase().includes(filter.toLowerCase()))
  //   }
  // })

  const vote = (anecdote) => {
    /** Code for using Hook */
    // dispatch(voteAnecdote(anecdote))
    // dispatch(setNotification(`${anecdote.id} is voted!`, 5))

    /** Code for using Connect */
    props.voteAnecdote(anecdote)
    props.setNotification(`${anecdote.id} is voted!`, 5)
  }

  return (
    <div>
      {/* Code for using Hook */}
      {/* {anecdotes.map(anecdote => */}

      {/*  Code for using Connect */}
      {props.anecdote.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

/** Code for using Connect */
const mapStateToProps = (state) => {
  if (state.filter === ''){
    return {
      anecdote: state.anecdote
    }
  }
  return {
    anecdote: state.anecdote.filter((item) => item.content.toLowerCase().includes(state.filter.toLowerCase()))
  }
}

/** Code for using Connect */
const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

/** Code for using Connect */
const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

/** Code for using Connect */
export default ConnectedAnecdoteList

/** Code for using Hook */
// export default AnecdoteList;