import React, { useState } from 'react'
import { makeStyles, Button, TextField } from '@material-ui/core'
import useFirebase from '../firebase'

const useStyles = makeStyles(theme => ({
  textField: {
    flex: '1 1 auto',
  },
  button: {
    margin: theme.spacing(2, 0),
    flex: '1 1 auto',
    textTransform: 'none',
  },
  input: {
    display: 'none',
  },
}))

const Login = () => {
  const classes = useStyles()

  const [email, setEmail] = useState(`${process.env.REACT_APP_ADMIN_ID}`)
  const [pw, setPw] = useState(`${process.env.REACT_APP_ADMIN_PW}`)

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
    </form>
  )
}

export default Login
