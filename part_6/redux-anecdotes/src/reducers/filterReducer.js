const filterReducer = (state = false, action) => {
  switch (action.type) {
    case 'FILTER':
      return state
    default:
      return state
  }
}

export const filterAnecdotes = filterFor => {
  return ({
    type: 'FILTER',
    filterFor
  })
}

export default filterReducer