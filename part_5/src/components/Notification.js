import React from 'react';

const Notification = ({ message }) => {
    const styles = {
        notifySuccess: {
            border: '2px solid green',
            color: 'green'

        },
        notifyFailure: {
            border: '2px solid red',
            color: 'red'
        },
        popupStyle: {
            borderRadius: '0.5vh',
            backgroundColor: '#d1d1e0',
            height: '3vh',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '1vh'
        }
    }
    if (message.message === null) {
        return <></>
    } else if (message.isSuccessful) {
        return (
            <div style={{ ...styles.notifySuccess, ...styles.popupStyle }} className="success">
                {message.message}
            </div>
        )
    } else {
        return (
            <div style={{ ...styles.notifyFailure, ...styles.popupStyle }} className="error" >
                {message.message}
            </div>
        )
    }


}

export default Notification;