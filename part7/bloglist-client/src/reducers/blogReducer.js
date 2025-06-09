import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const id = action.payload.id
      return state.filter(blog => blog.id !== id)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog =>
        blog.id === updatedBlog.id
          ? updatedBlog
          : blog
      )
    }
  }
})

export const {
  appendBlog,
  setBlogs,
  removeBlog,
  updateBlog
} = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort((b1, b2) => b2.likes - b1.likes)))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch(removeBlog(blog))
  }
}

export const incrementLikesOf = (blog) => {
  return async (dispatch, getState) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    const blogs = getState()
      .blogs
      .map(blog => blog.id === returnedBlog.id ? returnedBlog : blog)

    const sortedBlogs = blogs.sort((b1, b2) => b2.likes - b1.likes)

    dispatch(setBlogs(sortedBlogs))
  }
}

export default blogSlice.reducer
