import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const blogFormRef = useRef()
  const notifMsg = useSelector(({ notification }) => notification)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((b1, b2) => b2.likes - b1.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (userInfo) => {
    try {
      const user = await loginService.login(userInfo)
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setError(true)
      setTimeout(() => setError(false), 5000)
      dispatch(notify('wrong username or password', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(newBlog)
      setBlogs([...blogs, returnedBlog])
      dispatch(notify(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 5))
    } catch (exception) {
      console.error(exception)
      dispatch(notify('Error adding a blog', 5))
      setError(true)
      setTimeout(() => setError(false), 5000)
    }
  }

  const incrementLikesOf = async (id) => {
    try {
      const blog = blogs.find((blog) => blog.id === id)
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      }
      const returnedBlog = await blogService.update(id, updatedBlog)
      const sortedBlogs = blogs
        .map((blog) => (blog.id === returnedBlog.id ? returnedBlog : blog))
        .sort((b1, b2) => b2.likes - b1.likes)
      setBlogs(sortedBlogs)
    } catch (error) {
      console.error(error)
    }
  }

  const removeBlogOf = async (id) => {
    try {
      const blog = blogs.find((blog) => blog.id === id)
      const removeConfirmed = window
        .confirm(`Remove blog ${blog.title} by ${blog.author}?`)
      if (removeConfirmed) {
        await blogService.remove(blog.id)
        setError(true)
        setTimeout(() => setError(false), 5000)
        dispatch(notify(`removed ${blog.title}`, 5))
        setBlogs(blogs.filter((blog) => blog.id !== id))
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification
          message={notifMsg}
          error={true}
        />
        <LoginForm loginUser={handleLogin} />
      </>
    )
  }

  return (
    <>
      <h2>blogs</h2>

      <Notification
        message={notifMsg}
        error={error}
      />

      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable
        buttonLabel="new blog"
        ref={blogFormRef}
      >
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onLikeButtonClick={() => incrementLikesOf(blog.id)}
          onRemoveClick={() => removeBlogOf(blog.id)}
        />
      ))}
    </>
  )
}

export default App
