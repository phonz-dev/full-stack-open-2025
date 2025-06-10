import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, Button } from '@mui/material'


const Blog = ({ blog }) => {
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

  return (
    <>
      <ListItem className="blog-item">
        <Button
          component={Link}
          to={`/blogs/${blog.id}`}
          fullWidth
          variant='contained'
          color='info'
        >
          {blog.title} {blog.author}
        </Button>
      </ListItem>
    </>
  )
}

export default Blog
