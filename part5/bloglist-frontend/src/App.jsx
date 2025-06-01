import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState(null)

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

  const resetLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
      setUser(user)
      resetLoginForm()
    } catch (exception) {
      setNotificationMsg('wrong username or password')
      setTimeout(() => {
        setNotificationMsg(null)
      }, 3000)
      resetLoginForm()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    setUser(null)
  }

  const resetBlogsForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = { title, author, url }

    try {
      blogService.setToken(user.token)
      const returnedBlog = await blogService.create(newBlog)
      setBlogs([...blogs, returnedBlog])
      setNotificationMsg(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setNotificationMsg(null)
      }, 3000)
      resetBlogsForm()
    } catch (exception) {
      setNotificationMsg('Error adding a blog')
      setError(true)
      setTimeout(() => {
        setNotificationMsg(null)
        setError(false)
      }, 3000)

      resetBlogsForm()
      console.error({ error: exception })
    }
  }

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification message={notificationMsg} error={true} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="text"
              value={password}
              onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
  }

  return (
    <>
      <h2>blogs</h2>

      <Notification message={notificationMsg} error={error} />

      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>

      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default App
