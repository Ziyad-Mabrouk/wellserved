import React from 'react'
import '../Styles/Notification.css'

const Notification = ({ notification }) => {
  return (
    <div className='notification'>
      <p>{notification.message}</p>
    </div>
  )
}

export default Notification
