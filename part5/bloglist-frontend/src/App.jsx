import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  const handleLogin = async (userInfo) => {
    try {
      const user = await loginService.login(userInfo)
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
      setUser(user)
    } catch (exception) {
      setNotificationMsg('wrong username or password')
      setTimeout(() => {
        setNotificationMsg(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogService.setToken(user.token)
      const returnedBlog = await blogService.create(newBlog)
      setBlogs([...blogs, returnedBlog])
      setNotificationMsg(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setNotificationMsg(null)
      }, 3000)
    } catch (exception) {
      console.error(exception)
      setNotificationMsg('Error adding a blog')
      setError(true)
      setTimeout(() => {
        setNotificationMsg(null)
        setError(false)
      }, 3000)
    }
  }

  const incrementLikes = async id => {
    try {
      const blog = blogs.find(blog => blog.id === id)
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      await blogService.update(id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
    } catch (error) {
      console.error(error)
    }
  }

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification message={notificationMsg} error={true} />
        <LoginForm loginUser={handleLogin} />
      </>
    )
  }

  console.log(blogs[0])


  return (
    <>
      <h2>blogs</h2>

      <Notification message={notificationMsg} error={error} />

      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} onLikeButtonClick={() => incrementLikes(blog.id)} />
      )}
    </>
  )
}

export default App
