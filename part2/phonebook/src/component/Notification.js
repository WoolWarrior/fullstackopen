import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  let styleText =''
  if (message.includes('error') ){
    styleText = 'error'
  } else {
    styleText = 'info'
  }

  return (
    <div className={styleText}>
      {message}
    </div>
  )
}

export default Notification