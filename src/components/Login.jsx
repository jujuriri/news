import React from 'react'
import { makeStyles, Button, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
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
}))

function Login() {
  const classes = useStyles()
  return (
    <form className={classes.container} noValidate autoComplete="off">
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
    </form>
  )
}

export default Login
