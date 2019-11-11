import React, { useState } from 'react'
import {
  makeStyles,
  Typography,
  Button,
  TextField,
  ListItem,
  ListItemText,
  Avatar,
} from '@material-ui/core'
import useFirebase from '../firebase'
import avatarImg from '../assets/imgs/logo.svg'

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
  title: {
    marginBottom: theme.spacing(1),
  },
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

function Login() {
  const classes = useStyles()
  const loginMsg = 'Only administrator allow to login.'

  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Avatar alt="News" src={avatarImg} className={classes.logo} />
      <Typography className={classes.title} variant="h6">
        Login
      </Typography>
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
          useFirebase.login(email, pw).catch(err => console.log(err.message))
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
