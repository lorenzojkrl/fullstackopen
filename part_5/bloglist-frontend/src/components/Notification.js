import React from 'react';

const Notification = ({ message }) => {
    const styles = {
        loginError: {
            border: '1px solid red',
            padding: '10px',
            borderRadius: '10px',
            fontWeight: 'bold'
        },
        creationSuccess: {
            border: '1px solid green',
            padding: '10px',
            borderRadius: '10px',
            fontWeight: 'bold'
        }
    }

    if (message === null) {
        return null
    } else if (message.includes('A new blog:')) {
        return (
            <div style={styles.creationSuccess}>
                {message}
            </div>
        )
    } else {
        return (
            <div style={styles.loginError}>
                {message}
            </div>
        )
    }
}

export default Notification;