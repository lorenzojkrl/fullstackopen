
const notificationReducer = (state = '', action) => {

  switch (action) {
    case 'NOTIFY':
      return action.payload
    default:
      return state
  }

}

const notifyUser = (message) => {
  return {
    type: 'NOTIFY',
    payload: message
  }
}