const initialState = []

const blogsReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'INIT_BLOGS':
      return action.payload
    case 'MODIFY_BLOGS':
      return action.payload
    default:
      return state
  }

}

export const initBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    payload: blogs
  }
}

export const modifyBlogs = (blogs) => {
  return {
    type: 'MODIFY_BLOGS',
    payload: blogs
  }
}

export default blogsReducer;