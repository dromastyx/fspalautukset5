import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  const userStyle = {
    padding: 8,
    border: 'solid',
    textAlign: 'right',
    borderWidth: 2,
    margin: 12,
    backgroundColor: 'lightgreen'
  }
  if (!users) {
    return null
  }
  return (
    <div style={{ fontFamily: 'Arial' }}>
      <h1>Users</h1>
      <table style={userStyle}>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
          {users.map(u =>
            <tr key={u.id}>
              <td><Link to={`users/${u.id}`}>{u.name}</Link></td>
              <td><b>{u.blogs.length}</b></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
