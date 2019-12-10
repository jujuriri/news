import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'
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
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 3),
    },
  },
  toolbar: {
    width: '100%',
    maxWidth: 1320,
    padding: theme.spacing(0, 2),
    alignSelf: 'center',
    [theme.breakpoints.down('md')]: {
      maxWidth: 994,
    },
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'column',
      maxWidth: 651,
      padding: theme.spacing(0, 1),
    },
    [theme.breakpoints.down(600)]: {
      maxWidth: 310,
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
  logoLink: {
    textDecoration: 'none',
  },
  logoBtn: {
    fontWeight: 'bold',
    fontFamily: 'Meiryo',
    fontSize: '20px',
    color: '#55b4d1',
    margin: theme.spacing(0, 5, 0, 0),
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
  navBtnActive: {
    backgroundColor: theme.palette.action.selected,
  },
  loginBtn: {
    flex: '0 1 120px',
    margin: theme.spacing(0, 0, 0, 5),
    backgroundColor: '#C7E191',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#BDD983',
      borderColor: '#95CC75',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#A5C365',
      borderColor: '#95CC75',
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0),
      flex: '0 1 auto',
    },
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <Router basename={process.env.PUBLIC_URL}>
        <AppBar position="static" color="inherit" className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            <Link to="/" className={classes.logoLink}>
              <Typography className={`${classes.navBtn} ${classes.logoBtn}`}>
                Top News Headlines
              </Typography>
            </Link>
            <div className={classes.pageLabel}>
              <ListItem
                className={classes.navBtn}
                button
                key="Country and Category"
                component={NavLink}
                exact
                to="/"
                activeClassName={classes.navBtnActive}
              >
                <ListItemText primary="Country and Category" />
              </ListItem>
              <ListItem
                className={classes.navBtn}
                button
                key="Publisher"
                component={NavLink}
                to="/publ"
                activeClassName={classes.navBtnActive}
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
