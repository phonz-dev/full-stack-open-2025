import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    orderAnecdotes(state) {
      return [ ...state ].sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const id = action.payload.id
      return state.map(anecdote => anecdote.id === id ? action.payload : anecdote)
    }
  }
})

export const { orderAnecdotes, setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
    dispatch(orderAnecdotes())
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const returnedAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(returnedAnecdote))
  }
}

export const voteAnecdoteOf = id => {
  return async (dispatch, getState) => {
    const anecdoteToUpdate = getState().anecdotes.find(anecdote => anecdote.id === id)
    const updatedAnecdote = {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1
    }
    const savedAnecdote = await anecdoteService.update(id, updatedAnecdote)
    dispatch(updateAnecdote(savedAnecdote))
    dispatch(orderAnecdotes())
  }
}

export default anecdoteSlice.reducer
