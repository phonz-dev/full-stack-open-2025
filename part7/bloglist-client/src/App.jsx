import { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useQuery } from '@tanstack/react-query'
import { useUserValue, useUserDispatch } from './components/UserContext'



const App = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      userDispatch({ type: 'SET_USER', payload: user })
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    userDispatch({ type: 'REMOVE' })
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data.sort((b1, b2) => b2.likes - b1.likes)

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </>
    )
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification />

      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>

      {blogs.map((blog) =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default App
