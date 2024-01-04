import React from 'react'
import '../Styles/Home.css'
import { useState, useContext } from 'react'
import Zone from '../Components/Zone'
import Notification from '../Components/Notification'
import NotificationContext from '../NotificationContext'
import zone1 from '../Images/zone1.jpg'
import zone2 from '../Images/zone2.jpg'

const Home = () => {
    const [zones, setZones] = useState([
        {
        number: 1,
        image: zone1,
        },
        {
        number: 2,
        image: zone2,
        }])

    const {notifications} = useContext(NotificationContext)

  

  return (
    <div className='home'>
      <h1 className='title'>Welcome to WellServed!</h1>
      <h2 className='subtitle'>Here are the available zones:</h2>
      <div className='zones'>
        {
            zones.map((zone) => (
            <Zone zone={zone} />
            ))
        }
      </div>

      <h2 className='subtitle'>Notifications</h2>
      <div className='notifications'>
        {
          notifications.map((notification, index) => (
            <Notification key={index} notification={notification} />
          ))
        }
      </div>
    </div>
  )
}

export default Home
