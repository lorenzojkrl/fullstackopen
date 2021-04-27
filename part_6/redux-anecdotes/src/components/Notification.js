import React from 'react'
import { connect } from 'react-redux'
// import { useSelector } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector(state => state.notification)

  const notification = props.notification
  const style = {
    display: notification ? 'block' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

// export default Notification

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification