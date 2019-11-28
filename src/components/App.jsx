import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
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
    flexFlow: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 3),
      justifyContent: 'center',
      flexFlow: 'column',
    },
  },
  pageLabel: {
    display: 'flex',
    justifyContent: 'flex-start',
    flex: '1 1 auto',
    '& a': {
      marginRight: theme.spacing(2),
      flex: '0 1 10%',
    },
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'column',
      alignItems: 'center',
      width: '100%',
    },
  },
  logoBtn: {
    fontWeight: 'bold',
    fontFamily: 'Meiryo',
    cursor: 'pointer',
    fontSize: '20px',
    margin: theme.spacing(0, 5, 0, 1),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0),
    },
  },
  navBtn: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
    borderRadius: 3,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0.5, 2),
    },
  },
  loginBtn: {
    flex: '0 1 120px',
    margin: theme.spacing(0, 1, 0, 5),
    backgroundColor: '#007bff',
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0),
      flex: '0 1 auto',
    },
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
            <Typography className={`${classes.navBtn} ${classes.logoBtn}`}>
              Read Top News Headlines By
            </Typography>
            <div className={classes.pageLabel}>
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
            </div>
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
