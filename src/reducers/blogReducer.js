import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'REMOVE_BLOG':
    return state.filter(b => b.id !== action.id)
  case 'LIKE': {
    const blog = state.find(b => b.id === action.id)
    return state.map(b => b.id !== action.id ? b : { ...blog, likes: blog.likes +  1 })
  }
  default: return state
  }
}

export const createBlog = (blogObject, token) => {
  return async dispatch => {
    blogService.create(blogObject, token).then(blog => {
      dispatch({
        type: 'NEW_BLOG',
        data: blog
      })
      dispatch(setNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`, 5))
    })
  }
}

export const removeBlog = (blogObject, token) => {
  return async dispatch => {
    blogService.delObject(blogObject, token).then(() => {
      dispatch({
        type: 'REMOVE_BLOG',
        id: blogObject.id
      })
      dispatch(setNotification(`Blog '${blogObject.title}' deleted`, 5))
    })
      .catch(() => {
        dispatch(setNotification('You are not entitled to remove this blog', 5))
      })
  }
}

export const like = (blogObject) => {
  return async dispatch => {
    blogService.update({ ...blogObject, user: blogObject.user.id, likes: blogObject.likes + 1 }, blogObject.id)
      .then(() => {
        dispatch({
          type: 'LIKE',
          id: blogObject.id
        })
      })
      .catch(() => {
        dispatch(setNotification(`Blog ${blogObject.title} was already removed from server`, 5))
      })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default reducer