import React, { useEffect, useState } from 'react'
import commentService from '../services/comments'
import {
  useParams
} from 'react-router-dom'

const Blog = ({ blogs, updateLikes, removeBlog }) => {

  const blogStyle = {
    padding: 20,
    border: 'solid',
    borderWidth: 2,
    margin: 12
  }

  const [ comments, setComments ] = useState([])
  const [ comment, setComment ] = useState('')

  const id = useParams().id

  useEffect(() => {
    commentService.getAll(id).then(comments => {
      setComments(comments)
    })
  }, [id])

  const addComment = (event) => {
    event.preventDefault()
    commentService.create({ content: comment, blog: id }, id)
      .then(createdComment => setComments(comments.concat(createdComment)))
    setComment('')
  }

  const blog = blogs.find(u => u.id === id)
  if (!blog) {
    return null
  }

  return (
    <div style={blogStyle}>
      <h1> {blog.title} {blog.author} </h1>
      <div  className='togglable'>
        Url: <a href={blog.url}>{blog.url}</a>
        <p>Likes: {blog.likes} <button onClick={() => updateLikes(blog)} id="likeButton">like</button></p>
        <p>Added by {blog.user ? blog.user.name : ''}</p>
        <button onClick={() => removeBlog(blog)}>remove blog</button>
        <h3>Comments</h3>
        <form onSubmit={addComment}>
          <input value={comment} onChange={({ target }) => setComment(target.value)}/>
          <button type="submit">add comment</button>
        </form>
        <div>
          {comments.length !== 0 ? <ul>{comments.map(comment =>
            <li key={comment.id}>{comment.content}</li>
          )}</ul> : <p>No comments</p>}
        </div>
      </div>
    </div>
  )
}

export default Blog