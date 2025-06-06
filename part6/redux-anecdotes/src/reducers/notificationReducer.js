import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    }
  }
})

export const { notificationChange, removeNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(notificationChange(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
