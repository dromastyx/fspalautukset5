import React from 'react'
import {
  useParams
} from 'react-router-dom'

const User = ({ users }) => {
  const userStyle = {
    padding: 20,
    border: 'solid',
    borderWidth: 2,
    margin: 12
  }

  const id = useParams().id
  const user = users.find(u => u.id === id)
  if (!user) {
    return null
  }
  return (
    <div style={userStyle}>
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(b => <li key={b.id}> {b.title} </li>)}
      </ul>
    </div>
  )
}

export default User