import React, { useState, useEffect } from 'react'
import { NewsProvider } from '../context/news'
import { useFirebase } from '../firebase'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { CssBaseline, makeStyles, AppBar, Toolbar, ListItem, ListItemText } from '@material-ui/core'
import Home from './Home'
import Admin from './Admin'

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
  const [adminSettings, setAdminSettings] = useState({})

  useEffect(() => {
    useFirebase.getSettings().then(res => {
      setAdminSettings(res)
    })
    console.log('App here!', adminSettings)
  }, [])

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
              to="/admin"
            >
              <ListItemText primary="Admin" />
            </ListItem>
          </Toolbar>
        </AppBar>
        <Route
          exact
          path="/"
          render={() => (
            <NewsProvider>
              <Home />
            </NewsProvider>
          )}
        />
        <Route
          path="/admin"
          render={() => (
            <NewsProvider>
              <Admin />
            </NewsProvider>
          )}
        />
      </Router>
    </>
  )
}

export default App
