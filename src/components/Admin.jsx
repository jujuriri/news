import React from 'react'
import { useFirebase, useFirebaseAuth } from '../firebase'
import ControlPanel from './ControlPanel'
import Login from './Login'

function Admin() {
  const authUser = useFirebaseAuth(useFirebase)
  return authUser ? <ControlPanel /> : <Login />
}

export default Admin
