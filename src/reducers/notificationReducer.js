const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'RESET_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

let previousTimeoutId = null

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION',
        notification: null
      })
    }, time*1000)
    clearTimeout(previousTimeoutId)
    previousTimeoutId = timeoutId
  }
}


export default notificationReducer