const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTI':
      return action.notification
    case 'HIDE_NOTI':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (notification, displayTime) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTI',
      notification,
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTI',
        notification: null
      })
    }, displayTime * 1000)
  }
}

export default notificationReducer