
const notificationReducer = (state = 'Note this!', action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.notification
    default:
      return state
  }
};

export const setNotification = notification => {
  return ({
    type: 'NOTIFICATION',
    notification
  })
}

export default notificationReducer;