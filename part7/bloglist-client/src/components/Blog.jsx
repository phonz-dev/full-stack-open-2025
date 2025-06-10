import React, { useState } from 'react'
import { useNotificationDispatch } from './NotificationContext'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)
  const notifDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const removeBlogMutation = useMutation({
    mutationKey: ['blogs'],
    mutationFn: blogService.remove,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter(b => b.id !== blog.id)
      )
    }
  })


  const blogStyle = {
    border: '1px solid black',
    borderRadius: 2,
    marginTop: 5,
    padding: 5,
  }

  let loggedInUser = JSON.parse(
    window.localStorage.getItem('loggedBlogsAppUser'),
  )

  if (!loggedInUser) {
    loggedInUser = { name: blog.user.name }
  }

  const removeBlog = async () => {
    try {
      const removeConfirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

      if (removeConfirmed) {
        await removeBlogMutation.mutateAsync(blog.id)
        notifDispatch({
          type: 'SET_NOTIF',
          payload: {
            message: `removed ${blog.title}`,
            seconds: 5
          }
        })
      }
    } catch (error) {
      notifDispatch({
        type: 'SET_NOTIF',
        payload: {
          message: 'error deleting blog',
          isError: true,
          seconds: 5
        }
      })
    }
  }

  return (
    <>
      <div style={blogStyle} className="blog-item">
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <div>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </div>
          {/* <button onClick={() => setShow(!show)}>
            {show ? 'hide' : 'view'}
          </button> */}
        </div>
        {/* <div style={{ display: show ? '' : 'none' }} className="blog-dropdown">
          <div>{blog.url}</div>
          <div>
            likes <span className="likes-count">{blog.likes}</span>
            <button style={{ marginLeft: '5px' }} onClick={incrementLikes}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.name === loggedInUser.name && (
            <button onClick={removeBlog}>remove</button>
          )}
        </div> */}
      </div>
    </>
  )
}

export default Blog
