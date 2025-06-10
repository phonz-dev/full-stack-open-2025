import React from 'react'

const User = ({ user }) => {
  if (!user) return null

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(({ title, id }) =>
          <li key={id}>{title}</li>
        )}
      </ul>
    </>
  )
}

export default User
