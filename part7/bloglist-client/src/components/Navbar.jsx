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
    justifyContent: 'space-between',
    width: '1200px',
    margin: 'auto',
    padding: '20px 0'
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
              <Button
                component={Link}
                color='secondary'
                variant='contained'
                to='/'
              >
                home
              </Button>
            </div>
            <div>
              <Button
                component={Link}
                color='secondary'
                variant='contained'
                to='/blogs'
              >
                blogs
              </Button>
            </div>
            <div>
              <Button
                component={Link}
                color='secondary'
                variant='contained'
                to='/users'
              >
                users
              </Button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
            <div style={{ fontSize: 20 }}>
              {loggedInUser.name} logged in
            </div>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleLogout}
            >
            logout
            </Button>
          </div>
        </div>
      </AppBar>
    </>
  )
}

export default Navbar
