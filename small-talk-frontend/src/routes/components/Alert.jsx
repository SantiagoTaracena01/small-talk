import React from 'react'
import '../../styles/alert.sass'

const Alert = ({ message, setTrigger }) => (
  <div className="alert-background">
    <div className="alert-card">
      <p>{message}</p>
      <button onClick={() => setTrigger(false)}>Accept</button>
    </div>
  </div>
)

export default Alert
