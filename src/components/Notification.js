import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationStyle = {
    padding: 14,
    border: 'solid',
    borderWidth: 2,
    backgroundColor: '#DF698C',
    margin: 12
  }
  const message = useSelector(state => state.notification)
  if (message === null) {
    return null
  }
  return (
    <div className="error" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification