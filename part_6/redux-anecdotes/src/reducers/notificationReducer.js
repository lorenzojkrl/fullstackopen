
const notificationReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':

      if (state.pendingTimeoutHandler) {
        clearTimeout(state.pendingTimeoutHandler)
        state.pendingTimeoutHandler = false
      }
      return action.data

    case 'REMOVE_NOTIFICATION':
      return false
    default:
      return state
  }
};

export const setNotification = (notification, time) => {
  return async dispatch => {

    const newObj = {
      notification,
      pendingTimeoutHandler: setTimeout(() => {
        dispatch(removeNotification())
      }, time * 1000),
    }

    dispatch({
      type: 'SET_NOTIFICATION',
      data: newObj
    })

    // setTimeout(() => {
    //   dispatch({
    //     type: 'REMOVE_NOTIFICATION',
    //     notification
    //   })
    // }, time * 1000)

  }
}

export const removeNotification = () => {
  return ({
    type: 'REMOVE_NOTIFICATION',
  })
}

export default notificationReducer;