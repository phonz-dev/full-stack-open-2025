import { useDispatch, useSelector } from "react-redux"
import { voteAnecdoteOf, orderAnecdotes } from "../reducers/anecdoteReducer"
import { notificationChange, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(({ content }) => content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (id) => {
    dispatch(voteAnecdoteOf(id))
    dispatch(orderAnecdotes())

    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(notificationChange(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
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
