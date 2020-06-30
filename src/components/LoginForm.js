import React from 'react'
import PropTypes from 'prop-types'
import Notification from './Notification'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  message
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <div>
         username
          <input
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
         password
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm