import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject, user.token)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const updateBlog = (blogObject) => {
    const updatedBlog = {
      ...blogObject,
      user: blogObject.user.id,
      likes: blogObject.likes + 1
    }
    blogService
      .update(updatedBlog, blogObject.id)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== blogObject.id ? b : returnedBlog))
      })
      .catch(() => {
        setNotification(
          `Blog '${blogObject.title}' was already removed from server`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const removeBlog = (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      blogService
        .delObject(blogObject, user.token)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== blogObject.id))
          setNotification(
            `Blog '${blogObject.title}' deleted`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(() => {
          setNotification(
            'You are not entitled to remove this blog'
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Hi')
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const sortedBlogs = () => {
    return blogs.slice().sort((a,b) => b.likes - a.likes)
  }

  if (user === null) {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
        message={notification}
      />
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} />
      <p>
        {!user.name ? user.username : user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='new blog'>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      <div id="blogDiv">
        {sortedBlogs().map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={() => {updateBlog(blog)}}
            removeBlog={() => {removeBlog(blog)}}/>
        )}
      </div>
    </div>
  )
}

export default App