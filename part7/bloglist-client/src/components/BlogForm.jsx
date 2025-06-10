import { useState } from 'react'
import { useNotificationDispatch } from './NotificationContext'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import { Box, Button, TextField } from '@mui/material'

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
    <div style={{ width: 'fit-content' }}>
      <Togglable buttonLabel='new blog'>
        <h2>create new</h2>
        <form onSubmit={addBlog} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3
          }}>
            <div style={{ fontSize: 20 }}>Title:</div>
            <TextField
              data-testid="title"
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder="blog title"
            />
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3
          }}>
            <div style={{ fontSize: 20 }}>Author:</div>
            <TextField
              data-testid="author"
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="author of blog"
            />
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3
          }}>
            <div style={{ fontSize: 20 }}>URL:</div>
            <TextField
              data-testid="url"
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              placeholder="blog url"
            />
          </Box>
          <Button
            color='warning'
            variant='contained'
            type="submit"
            sx={{ margin: '15px 0' }}
            fullWidth
          >
            create
          </Button>
        </form>
      </Togglable>
    </div>
  )
}

export default BlogForm
