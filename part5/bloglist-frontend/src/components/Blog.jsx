import { useState } from "react"

const Blog = ({ blog, onLikeButtonClick }) => {
  const [show, setShow] = useState(false)

  const blogStyle = {
    border: '1px solid black',
    borderRadius: 2,
    marginTop: 5,
    padding: 5
  }

  return (
    <>
      <div style={blogStyle}>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <div>
            {blog.title} {blog.author}
          </div>
          <button onClick={() => setShow(!show)}>{ show ? 'hide': 'view' }</button>
        </div>
        <div style={{ display: show ? '' : 'none'  }}>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button style={{ marginLeft: '5px' }} onClick={onLikeButtonClick} >like</button>
          </div>
          <div>{blog.author}</div>
        </div>
      </div>
    </>
  )
}

export default Blog
