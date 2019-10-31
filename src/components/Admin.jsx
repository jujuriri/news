import React from 'react'
import { useHistory } from 'react-router-dom'

function Admin() {
  const history = useHistory()
  return (
    <div>
      <h1>Hello Admin !</h1>
      <button onClick={() => history.goBack()}>Go Back</button>
    </div>
  )
}

export default Admin
