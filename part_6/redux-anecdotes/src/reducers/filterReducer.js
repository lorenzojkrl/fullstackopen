

const filterReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  console.log('in reducer filter', action.data)

  switch (action.type) {
    case 'FILTER_ANECDOTE':
      return action.data
    default:
      return state
  }

}

// action creator 
export const filterAnecdote = (content) => {
  console.log('content: ', content)

  return {
    type: 'FILTER_ANECDOTE',
    data: content
  }

}

export default filterReducer