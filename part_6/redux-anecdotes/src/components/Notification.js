import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    margin: '1vh',
  }

  const close = () => {
    setTimeout(() => { dispatch(toggleNotification(false)) }, 5000)
  }

  return notification
    ? <>
      <div style={style}> {notification} </div>
      {close()}
    </>
    : <></>



}

export default Notification