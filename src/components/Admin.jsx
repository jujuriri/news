import React from 'react'
import useFirebase from '../firebase'
import { useFirebaseAuth } from '../customHooks'
import ControlPanel from './ControlPanel'
import Login from './Login'

function Admin() {
  const authUser = useFirebaseAuth(useFirebase)
  return authUser ? <ControlPanel /> : <Login />
}

export default Admin
