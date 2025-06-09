import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useQuery } from '@tanstack/react-query'



const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    dispatch(setUser(null))
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
