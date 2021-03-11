const notificationReducer = (state = 'amIright?', action) => {
  switch (action.type) {
    case 'NOTIFY':
      return state
    default:
      return state
  }
}

// action creator 
export const notifyUser = (message) => {
  return {
    type: 'NOTIFY',
    data: message
  }
}

export default notificationReducer