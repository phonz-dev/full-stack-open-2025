import { useState } from 'react'
import { useNotificationDispatch } from './NotificationContext'
import { useLoggedInUserDispatch } from './UserContext'
import { useMutation } from '@tanstack/react-query'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
