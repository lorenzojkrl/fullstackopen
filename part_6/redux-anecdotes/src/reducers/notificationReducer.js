const initialNotification = false

const notificationReducer = (state = initialNotification, action) => {
    console.log('notificationReducer state now notR: ', state)
    console.log('notificationReducer action notR', action)

    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return action.data.content

        default:
            return state
    }
}

export const toggleNotification = (content) => {
    // alert(` in showNotification`)
    return {
        type: 'SHOW_NOTIFICATION',
        data: { content }
    }
}


export default notificationReducer