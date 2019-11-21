import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink, useHistory } from 'react-router-dom'
import {
  CssBaseline,
  makeStyles,
  AppBar,
  Toolbar,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import Home from './Home'
import Admin from './Admin'

const useStyles = makeStyles(theme => ({
  appbar: {
    boxShadow: 'unset',
    marginBottom: theme.spacing(2),
  },
  toolbar: {
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 7),
      justifyContent: 'center',
    },
  },
  logoBtn: {
    fontWeight: 'bold',
    fontFamily: 'Meiryo',
    cursor: 'pointer',
    fontSize: '20px',
  },
  navBtn: {
    flex: '0 0 8%',
    margin: theme.spacing(0, 2),
    textAlign: 'center',
    whiteSpace: 'nowrap',
    borderRadius: 3,
    [theme.breakpoints.down('sm')]: {
      flex: '0 1 80%',
      margin: theme.spacing(0.5, 2),
    },
  },
  loginBtn: {
    border: '1px solid silver',
  },
}))

function App() {
  const classes = useStyles()

  useEffect(() => {
    console.log('App here!')
  }, [])

  return (
    <>
      <CssBaseline />
      <Router basename={process.env.PUBLIC_URL}>
        <AppBar position="static" color="inherit" className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            <Typography className={`${classes.navBtn} ${classes.logoBtn}`}>Read News By</Typography>
            <ListItem
              className={classes.navBtn}
              button
              key="Country and Category"
              component={NavLink}
              exact
              to="/"
            >
              <ListItemText primary="Country and Category" />
            </ListItem>
            <ListItem
              className={classes.navBtn}
              button
              key="Publisher"
              component={NavLink}
              to="/publ"
            >
              <ListItemText primary="Publisher" />
            </ListItem>
            <ListItem
              className={`${classes.navBtn} ${classes.loginBtn}`}
              button
              key="Login"
              component={NavLink}
              to="/admin"
            >
              <ListItemText primary="Admin" />
            </ListItem>
          </Toolbar>
        </AppBar>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/publ" render={() => <Home />} />
        <Route path="/admin" render={() => <Admin />} />
      </Router>
    </>
  )
}

export default App
