import React, { useState } from 'react'
const Blog = ({ blog, updateLikes, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showFull, setShowFull] = useState(false)

  const showFullData = { display: showFull ? '' : 'none' }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setShowFull(!showFull)}>{showFull ? 'hide' : 'view'}</button>
      <div style={showFullData} className='togglable'>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={updateLikes} id="likeButton">like</button></p>
        <p>{blog.user ? blog.user.name : ''}</p>
        <button onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
