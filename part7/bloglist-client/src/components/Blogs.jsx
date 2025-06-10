import React from 'react'
import Blog from './Blog'
import { useQueryClient } from '@tanstack/react-query'
import { List } from '@mui/material'

const Blogs = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])

  if (!blogs) return null

  const sortedBlogs = blogs.sort((b1, b2) => b2.likes - b1.likes)

  return (
    <List>
      {sortedBlogs.map((blog) =>
        <Blog key={blog.id} blog={blog} />
      )}
    </List>
  )
}

export default Blogs
