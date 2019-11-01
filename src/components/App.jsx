import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { CssBaseline, makeStyles, AppBar, Toolbar, ListItem, ListItemText } from '@material-ui/core'
import Home from './Home'
import Login from './Login'
import firebase from '../firebase'

const useStyles = makeStyles(theme => ({
  appbar: {
    marginBottom: theme.spacing(4),
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  newsBtn: {
    flex: '0 0 60px',
  },
  loginBtn: {
    flex: '0 0 60px',
  },
}))

function App() {
  const classes = useStyles()

  useEffect(() => {
    console.log('yooo')
    const unsubscribe = firebase.isInitialized(setUser)

    return () => unsubscribe()
  }, [])

  const [user, setUser] = useState({ loggedIn: false })

  return (
    <>
      <CssBaseline />
      <Router>
        <AppBar position="static" color="inherit" className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            <ListItem
              className={classes.newsBtn}
              button
              key="News"
              component={NavLink}
              exact
              to="/"
            >
              <ListItemText primary="News" />
            </ListItem>
            <ListItem
              className={classes.loginBtn}
              button
              key="Login"
              component={NavLink}
              to="/login"
            >
              <ListItemText primary="Login" />
            </ListItem>
          </Toolbar>
        </AppBar>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/login" render={() => <Login />} />
      </Router>
    </>
  )
}

export default App
