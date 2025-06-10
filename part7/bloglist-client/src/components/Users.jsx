import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

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
            <td style={{ fontWeight: 'bold', fontSize: 20 }}>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map(({ name, blogs, id }) =>
            <tr key={id}>
              <td>
                <Button
                  component={Link}
                  to={`/users/${id}`}
                  variant='contained'
                  fullWidth
                  color='secondary'
                >
                  {name}
                </Button>
              </td>
              <td style={{ textAlign: 'right', fontSize: 15, fontWeight: 'bold' }}>{blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Users
