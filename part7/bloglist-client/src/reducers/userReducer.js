import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const loginUser = (userInfo) => {
  return async dispatch => {
    const user = await loginService.login(userInfo)
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
