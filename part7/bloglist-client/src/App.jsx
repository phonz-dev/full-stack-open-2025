import { useEffect } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import { useQuery } from '@tanstack/react-query'
import { useLoggedInUserValue, useLoggedInUserDispatch } from './components/UserContext'
import { Routes, Route, useMatch } from 'react-router-dom'
import userService from './services/users'
import Users from './components/Users'
import User from './components/User'
import Home from './components/Home'
import BlogDetails from './components/BlogDetails'


const App = () => {
  const loggedInUser = useLoggedInUserValue()
  const loggedInUserDispatch = useLoggedInUserDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      loggedInUserDispatch({ type: 'SET_USER', payload: user })
    }
  }, [loggedInUserDispatch])

  const usersResult = useQuery({ queryKey: ['users'], queryFn: userService.getAll })
  const blogsResult = useQuery({ queryKey: ['blogs'], queryFn: blogService.getAll })

  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  if (usersResult.isLoading && blogsResult.isLoading) {
    return <div>loading data...</div>
  }

  const users = usersResult.data
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogs = blogsResult.data
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    loggedInUserDispatch({ type: 'REMOVE' })
  }

  const userStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    marginBottom: 25
  }

  if (loggedInUser === null) {
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
      <div style={userStyles}>
        <p>{loggedInUser.name} logged in</p>
        <div>
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users/:id' element={<User user={user} />} />
        <Route path='/blogs/:id' element={<BlogDetails blog={blog} />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </>
  )
}

export default App
