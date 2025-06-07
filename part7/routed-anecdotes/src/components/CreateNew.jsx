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
      content: content.fieldProps.value,
      author: author.fieldProps.value,
      info: info.fieldProps.value,
      votes: 0
    }
    addNew(anecdote)
    navigate('/')
  }

  const resetFields = () => {
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
          <input {...content.fieldProps} />
        </div>
        <div>
          author
          <input {...author.fieldProps} />
        </div>
        <div>
          url for more info
          <input {...info.fieldProps} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={resetFields}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
