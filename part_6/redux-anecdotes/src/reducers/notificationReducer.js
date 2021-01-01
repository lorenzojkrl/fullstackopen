const initialNotification = false

const notificationReducer = (state = initialNotification, action) => {
    // console.log('notificationReducer state now notR: ', state)
    // console.log('notificationReducer action notR', action)

    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return action.data.content

        case 'CLEAR':
            return false

        default:
            return state
    }
}

export const toggleNotification = (content, time) => {
    return async dispatch => {
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: { content }
        })
    }
}

export const clearNotification = () => {
    return ({
        type: 'CLEAR',
    })
}
// export const initializeAnecdotes = () => {
//     return async dispatch => {
//       const anecdotes = await anecdotesService.getAll()
//       dispatch({
//         type: 'INIT_ANECDOTES',
//         data: anecdotes,
//       })
//     }
//   }


export default notificationReducer