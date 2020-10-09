import React from 'react';

const Notification = ({ message, isSuccessful }) => {
    if (message === '') {
        return null
    } else if (isSuccessful) {
        return (
            <div className="notifySuccess">
                {message}
            </div>
        )
    } else {
        return (
            <div className="notifyFailure">
                {message}
            </div>
        )
    }


}

export default Notification;