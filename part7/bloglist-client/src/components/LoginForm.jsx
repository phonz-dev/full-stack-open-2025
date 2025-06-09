import { useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useNotificationDispatch } from './NotificationContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const notifDispatch = useNotificationDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser({ username, password }))
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
