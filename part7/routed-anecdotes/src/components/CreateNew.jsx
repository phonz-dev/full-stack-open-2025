import { useNavigate } from "react-router-dom"
import { useField } from "../hooks/index"

const CreateNew = ({ addNew }) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    const anecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    }
    addNew(anecdote)
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateNew
