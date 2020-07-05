import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import User from './components/User'
import Users from './components/Users'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Menu from './components/Menu'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/loginReducer'
import { initializeBlogs, createBlog, removeBlog, like } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject, user.token))
  }

  const updateBlog = (blogObject) => {
    dispatch(like(blogObject))
  }

  const deleteBlog = (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      dispatch(removeBlog(blogObject, user.token))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 5))
    }
  }


  const handleLogout = () => {
    dispatch(setUser(null))
    window.localStorage.clear()
  }

  const sortedBlogs = blogs.slice().sort((a,b) => b.likes - a.likes)

  if (user === null) {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    )
  }

  return (
    <Router>
      <div style={{ fontFamily: 'Arial' }}>
        <h1 style={{ color: 'darkgreen', margin: 8 }}><b>Blogs</b></h1>
        <Notification />
        <div>
          <Menu />
          <div style={{ margin: 12, fontStyle: 'italic' }}>
            {!user.name ? user.username : user.name} logged in { }
            <button onClick={handleLogout}>logout</button>
          </div>
        </div>
        <Switch>
          <Route path="/users/:id">
            <User users={users}/>
          </Route>
          <Route path="/blogs/:id">
            <Blog blogs={blogs} updateLikes={updateBlog} removeBlog={deleteBlog}/>
          </Route>
          <Route path="/users">
            <Users users={users}/>
          </Route>
          <Route path="/">
            <Togglable buttonLabel='new blog'>
              <BlogForm createBlog={addBlog}/>
            </Togglable>
            <Blogs blogs={sortedBlogs}/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App