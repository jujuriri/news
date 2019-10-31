import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import Home from './Home'
import Login from './Login'
import firebase from '../firebase'

function App() {
  useEffect(() => {
    console.log('yooo')
    const unsubscribe = firebase.isInitialized(setUser)
    
    return () => unsubscribe()
  }, [])

  const [user, setUser] = useState({ loggedIn: false })

  return (
    <>
      <CssBaseline />
      <header>
        <div>Logo</div>
        <Router>
          <div>
            <NavLink exact to="/" activeClassName="nav-active">
              Home
            </NavLink>
            <NavLink to="/login" activeClassName="nav-active">
              Login
            </NavLink>
          </div>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/login" render={() => <Login />} />
        </Router>
      </header>
    </>
  )
}

export default App
