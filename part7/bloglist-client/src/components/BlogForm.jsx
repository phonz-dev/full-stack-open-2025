import { useState } from 'react'
import { useNotificationDispatch } from './NotificationContext'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const notifDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationKey: ['blogs'],
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], [...blogs, newBlog])
    }
  })

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      await newBlogMutation.mutateAsync({ title, author, url })
      notifDispatch({
        type: 'SET_NOTIF',
        payload: {
          message: `a new blog ${title} by ${author} added`,
          seconds: 5
        },
      })
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      notifDispatch({
        type: 'SET_NOTIF',
        payload: {
          message: 'Error adding a blog',
          isError: true,
          seconds: 5
        }
      })
    }
  }

  return (
    <>
      <Togglable buttonLabel='new blog'>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
          title:
            <input
              data-testid="title"
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder="blog title"
            />
          </div>
          <div>
          author:
            <input
              data-testid="author"
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="author of blog"
            />
          </div>
          <div>
          url:
            <input
              data-testid="url"
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              placeholder="blog url"
            />
          </div>
          <button type="submit">create</button>
        </form>
      </Togglable>
    </>
  )
}

export default BlogForm
