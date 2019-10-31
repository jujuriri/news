import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import Home from './Home'
import Login from './Login'
import firebase from '../firebase'

function App() {
  const [user, setUser] = useState({ loggedIn: false })

  useEffect(() => {
    const unsubscribe = firebase.isInitialized(setUser)
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
