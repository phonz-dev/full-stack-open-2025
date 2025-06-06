import { useDispatch, useSelector } from "react-redux"
import { voteAnecdoteOf } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(({ content }) => content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (id) => {
    dispatch(voteAnecdoteOf(id))
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
