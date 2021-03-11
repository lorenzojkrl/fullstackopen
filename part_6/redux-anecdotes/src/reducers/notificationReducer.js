
const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data

    case 'CLEAR':
      return null

    default:
      return state
  }
}

// action creator 
export const toggleNotification = (content) => {
  console.log('toggleNotification', content);

  return {
    type: 'SHOW_NOTIFICATION',
    data: content
  }
}

export const clearNotification = () => {
  return ({
    type: 'CLEAR',
  })
}

export default notificationReducer






