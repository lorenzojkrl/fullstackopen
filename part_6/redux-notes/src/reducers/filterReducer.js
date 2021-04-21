const filterReducer = (state = 'ALL', action) => {
  console.log('action in red', action);
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

// action creator
export const filterChange = filter => {
  console.log('filter in action', filter);
  return {
    type: 'SET_FILTER',
    filter,
  }
}

export default filterReducer