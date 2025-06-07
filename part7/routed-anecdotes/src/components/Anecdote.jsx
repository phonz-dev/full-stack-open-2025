import { Link } from "react-router-dom"

const Anecdote = ({ anecdote }) => {
  if (!anecdote) return null

  return (
    <div style={{ marginBottom: 10 }}>
      <h3>{anecdote.content} by {anecdote.author}</h3>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <Link to={anecdote.info} target='_blank'>{anecdote.info}</Link></div>
    </div>
  )
}

export default Anecdote
