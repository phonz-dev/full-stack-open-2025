import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'
import blogService from '../services/blogs'
import { TextField, Button } from '@mui/material'

const BlogDetails = (({ blog }) => {
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()
  const notifDispatch = useNotificationDispatch()

  const incrementLikesMutation = useMutation({
    mutationKey: ['blogs'],
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)
      )
    }
  })

  const addCommentMutation = useMutation({
    mutationKey: ['blog'],
    mutationFn: ({ id, updatedBlog }) => blogService.addComment(id, updatedBlog),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      if (!blogs) return
      queryClient.setQueryData(
        ['blogs'],
        blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
      )
    }
  })

  const addComment = async (event) => {
    event.preventDefault()
    try {
      const updatedBlog = {
        ...blog,
        comments: [...blog.comments, comment]
      }
      await addCommentMutation.mutateAsync({ id: blog.id, updatedBlog })
      setComment('')
      notifDispatch({
        type: 'SET_NOTIF',
        payload: {
          message: 'comment added',
          seconds: 3
        }
      })
    } catch (error) {
      notifDispatch({
        type: 'SET_NOTIF',
        payload: {
          message: 'error commenting',
          isError: true,
          seconds: 5
        }
      })
    }
  }

  const incrementLikes = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      await incrementLikesMutation.mutateAsync({ id: blog.id, updatedBlog })
    } catch (error) {
      notifDispatch({
        type: 'SET_NOTIF',
        payload: {
          message: 'error liking blog',
          isError: true,
          seconds: 5
        }
      })
    }
  }

  if (!blog) return null

  return (
    <>
      <h2>{blog.title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Link to={blog.url} target='_blank'>{blog.url}</Link>
        <div>{blog.likes} likes <button onClick={incrementLikes}>like</button></div>
        <div>added by {blog.user.name}</div>
      </div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <TextField value={comment} onChange={(e) => setComment(e.target.value)} variant="outlined" />
          <Button type='submit' variant='outlined'>add comment</Button>
        </div>
      </form>

      <ul>
        {blog.comments.length !== 0
          && blog.comments.map(comment =>
            <li key={comment}>{comment}</li>
          )}
      </ul>
    </>
  )
})

export default BlogDetails
