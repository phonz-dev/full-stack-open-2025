import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const Users = () => {
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['users'])

  if (!users) return null

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td style={{ fontWeight: 'bold' }}>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map(({ name, blogs, id }) =>
            <tr key={id}>
              <td><Link to={`/users/${id}`}>{name}</Link></td>
              <td>{blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Users
