import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'
import blogService from '../services/blogs'

const BlogDetails = (({ blog }) => {
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
    </>
  )
})

export default BlogDetails
