import React from 'react'
import { makeStyles, Button, TextField, ListItem, ListItemText, Avatar } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  logo: {
    margin: 10,
    width: 60,
    height: 60,
  },
  textField: {
    margin: theme.spacing(1),
    flex: '1 1 auto',
  },
  button: {
    margin: theme.spacing(1),
    flex: '1 1 auto',
  },
  input: {
    display: 'none',
  },
  loginMsg: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
}))

function Login() {
  const classes = useStyles()
  const loginMsg = 'Only administrator allow to login.'

  return (
    <>
      <form className={classes.container} noValidate autoComplete="off">
        <Avatar alt="News" src={require('../assets/imgs/logo.svg')} className={classes.logo} />
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="Email"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <Button variant="outlined" className={classes.button} fullWidth>
          Log In
        </Button>
        <ListItem className={classes.loginMsg}>
          <ListItemText primary={loginMsg} />
        </ListItem>
      </form>
    </>
  )
}

export default Login
