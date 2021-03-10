const initialFilter = ''

const filterReducer = (state = initialFilter, action) => {
  // console.log('filterReducer state: ', state)
  // console.log('filterReducer action', action)


  switch (action.type) {
    case 'FILTER':
      return action.data.content

    default:
      return state
  }
}

export const filterAction = (content) => {
  return {
    type: 'FILTER',
    data: { content }
  }
}


export default filterReducer