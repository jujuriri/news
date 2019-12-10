import React, { useState } from 'react'
import { makeStyles, Button, TextField, ListItem, ListItemText } from '@material-ui/core'
import useFirebase from '../firebase'

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(1),
    flex: '1 1 auto',
  },
  button: {
    margin: theme.spacing(1),
    flex: '1 1 auto',
    textTransform: 'none',
  },
  input: {
    display: 'none',
  },
  loginMsg: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
}))

const Login = () => {
  const classes = useStyles()
  const loginMsg = 'Only administrator allow to login.'

  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  return (
    <form noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        className={classes.textField}
        label="Email"
        margin="normal"
        variant="outlined"
        fullWidth
        value={email}
        onChange={e => setEmail(e.target.value)}
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
        value={pw}
        onChange={e => setPw(e.target.value)}
      />
      <Button
        variant="outlined"
        className={classes.button}
        fullWidth
        onClick={() => {
          useFirebase.login(email, pw).catch(err => {
            throw new Error(err.message)
          })
        }}
      >
        Login
      </Button>
      <ListItem className={classes.loginMsg}>
        <ListItemText primary={loginMsg} />
      </ListItem>
    </form>
  )
}

export default Login
