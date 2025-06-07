import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNew } from "../services/anecdotes"
import { useNotificationDispatch } from "./NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notifDispatch = useNotificationDispatch()

  const createMutation = useMutation({
    mutationFn: createNew,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], [...anecdotes, newAnecdote])
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createMutation.mutate({ content, votes: 0 })
    notifDispatch({
      type: 'SET_NOTIF',
      payload: `anecdote '${content}' created`
    })
    setTimeout(() => {
      notifDispatch({ type: 'REMOVE' })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
