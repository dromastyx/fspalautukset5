import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div style={{ margin: 12 }}>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <table>
            <tbody>
              <tr>
                <td>Title:</td>
                <td>
                  <input
                    id='title'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Author:</td>
                <td>
                  <input
                    id='author'
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Url:</td>
                <td>
                  <input
                    id='url'
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm