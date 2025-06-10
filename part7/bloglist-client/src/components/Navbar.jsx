import React from 'react'
import { useLoggedInUserValue, useLoggedInUserDispatch } from './UserContext'
import { AppBar, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const loggedInUser = useLoggedInUserValue()
  const loggedInUserDispatch = useLoggedInUserDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    loggedInUserDispatch({ type: 'REMOVE' })
  }

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: 10
  }

  const linksContainerStyles = {
    display: 'flex',
    gap: 5
  }

  return (
    <>
      <AppBar>
        <div style={containerStyles}>
          <div style={linksContainerStyles}>
            <div>
              <Link to='/'>home</Link>
            </div>
            <div>
              <Link to='/blogs'>blogs</Link>
            </div>
            <div>
              <Link to='/users'>users</Link>
            </div>
          </div>
          <div>
            {loggedInUser.name} logged in
          </div>
          <Button
            color='secondary'
            sx={{ textTransform: 'lowercase' }}
            onClick={handleLogout}
          >
            logout
          </Button>
        </div>
      </AppBar>
    </>
  )
}

export default Navbar
