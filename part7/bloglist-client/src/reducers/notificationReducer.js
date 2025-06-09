import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notif',
  initialState: null,
  reducers: {
    addMessage (state, action) {
      return action.payload
    },
    removeMessage (state, action) {
      return null
    },
  },
})

export const { addMessage, removeMessage } = notificationSlice.actions

export const notify = (message, seconds, isError = false) => {
  return async (dispatch) => {
    dispatch(addMessage({ message, isError }))
    setTimeout(() => {
      dispatch(removeMessage())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
