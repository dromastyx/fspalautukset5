import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    padding: 8,
    marginRight: 15,
    border: 'solid',
    backgroundColor: '#B3EDCE'
  }

  const menuStyle = {
    padding: 10,
    marginBottom: 10,
    fontFamily: 'Arial'
  }

  return(
    <div style={menuStyle}>
      <Link style={padding} to="/"><b>Blogs</b></Link>
      <Link style={padding} to="/users"><b>Users</b></Link>
    </div>
  )
}

export default Menu