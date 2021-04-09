import React from 'react'

const UserBanner = ({ user, handleLogout }) => {
  return (
    <div>
      <h2>blogs</h2>
      <div>{user.username} Logged in</div>
      <button onClick={handleLogout}>logout</button>
      <br></br>
    </div>
  )
}

export default UserBanner