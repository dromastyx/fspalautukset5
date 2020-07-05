import React from 'react'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  const blogStyle = {
    padding: 8,
    border: 'solid',
    borderWidth: 2,
    margin: 12,
    backgroundColor: 'lightgrey'
  }
  if (!blogs) {
    return null
  }
  return (
    <div id="blogDiv">
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      )}
    </div>
  )
}

export default Blogs


