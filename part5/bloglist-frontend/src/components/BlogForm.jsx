import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            data-testid="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder='blog title'
          />
        </div>
        <div>
          author:
          <input
            data-testid="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='author of blog'
          />
        </div>
        <div>
          url:
          <input
            data-testid="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='blog url'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm
