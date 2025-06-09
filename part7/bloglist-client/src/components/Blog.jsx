import { useState } from 'react'

const Blog = ({ blog, onLikeButtonClick, onRemoveClick }) => {
  const [show, setShow] = useState(false)

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
      <div style={blogStyle} className="blog-item">
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <div>
            {blog.title} {blog.author}
          </div>
          <button onClick={() => setShow(!show)}>
            {show ? 'hide' : 'view'}
          </button>
        </div>
        <div style={{ display: show ? '' : 'none' }} className="blog-dropdown">
          <div>{blog.url}</div>
          <div>
            likes <span className="likes-count">{blog.likes}</span>
            <button style={{ marginLeft: '5px' }} onClick={onLikeButtonClick}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.name === loggedInUser.name && (
            <button onClick={onRemoveClick}>remove</button>
          )}
        </div>
      </div>
    </>
  )
}

export default Blog
