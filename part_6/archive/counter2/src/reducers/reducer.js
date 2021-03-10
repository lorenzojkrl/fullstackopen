
const counterReducer = (state = { "bad": 0, "good": 0, "ok": 0 }, action) => {
  const newState = { ...state }

  switch (action.type) {
    case 'GOOD':
      newState.good += 1
      return newState;
    case 'BAD':
      newState.bad += 1
      return newState
    case 'OK':
      newState.ok += 1
      return newState;
    default:
      return state
  }
}

export default counterReducer;