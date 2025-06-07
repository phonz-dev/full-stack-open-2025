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

  const resetField = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name={content.name}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            name={author.name}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            name={info.name}
            value={info.value}
            onChange={info.onChange}
          />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={resetField}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
