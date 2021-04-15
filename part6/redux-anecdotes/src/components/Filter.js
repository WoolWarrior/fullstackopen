import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
import { setNotification } from '../reducers/notificationReducer'

/** Code for using Hook */
// const Filter = () => {
const Filter = (props) => {
  /** Code for using Hook */
  // const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const text = event.target.value
    /** Code for using Hook */
    // dispatch(filterChange(text))
    // dispatch(setNotification(`Searching ${text}`, 5))

    /** Code for using Connect */
    props.filterChange(text)
    props.setNotification(`Searching ${text}`, 5)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name="textFilter" onChange={handleChange} />
    </div>
  )
}

/** Code for using Connect */
const mapDispatchToProps = {
  filterChange,
  setNotification
}

/** Code for using Connect */
const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

/** Code for using Connect */
export default ConnectedFilter

/** Code for using Hook */
// export default Filter