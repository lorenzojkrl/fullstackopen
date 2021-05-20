const initialState = { message: null, isSuccessful: true }

const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'NOTIFY':
      return action.payload
    default:
      return state
  }

}

export const notifyUser = (messageObj) => {
  return {
    type: 'NOTIFY',
    payload: messageObj
  }
}

export default notificationReducer;