import { useState } from 'react'
import { useNotificationDispatch } from './NotificationContext'
import { useLoggedInUserDispatch } from './UserContext'
import { useMutation } from '@tanstack/react-query'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { Card, TextField, Button, Input, Box } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const notifDispatch = useNotificationDispatch()
  const loggedInUserDispatch = useLoggedInUserDispatch()

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: loginService.login,
    onSuccess: (user) => {
      loggedInUserDispatch({
        type: 'SET_USER',
        payload: user
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
    }
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await loginMutation.mutateAsync({ username, password })
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (error) {
      notifDispatch({
        type: 'SET_NOTIF',
        payload: {
          message: 'wrong username or password',
          isError: true,
          seconds: 5
        }
      })
    }
  }

  return (
    <div style={{ margin: '150px auto', width: 'fit-content' }}>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 20 }}>Username</div>
          <TextField
            data-testid="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 20 }}>Password</div>
          <TextField
            data-testid="password"
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Box>
        <Button
          fullWidth
          sx={{ marginTop: 3 }}
          variant='contained'
          color='secondary'
          type='submit'
        >
        login
        </Button>
      </form>
    </div>

  )
}

export default LoginForm
