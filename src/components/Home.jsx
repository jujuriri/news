import React from 'react'
import { useHistory } from 'react-router-dom'

function Home() {
  const history = useHistory()
  return (
    <div className="Home">
      <h1>Home(Public)</h1>
      <button onClick={() => history.push('/admin')}>Admin</button>
    </div>
  )
}

export default Home
