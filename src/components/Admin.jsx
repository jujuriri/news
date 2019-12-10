import React from 'react'
import { makeStyles, Typography, Avatar } from '@material-ui/core'
import useFirebase from '../firebase'
import { useFirebaseAuth } from '../customHooks'
import ControlPanel from './ControlPanel'
import Login from './Login'
import adminIcon from '../imgs/avatar-admin.png'
import guestIcon from '../imgs/avatar-guest.png'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    maxWidth: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down(360)]: {
      padding: theme.spacing(0, 3),
    },
  },
  logo: {
    margin: 10,
    width: 60,
    height: 60,
    '& img': {
      maxWidth: '80%',
      height: 'unset',
    },
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}))

function Admin() {
  const classes = useStyles()
  const authUser = useFirebaseAuth(useFirebase)
  const avatarImg = authUser ? adminIcon : guestIcon
  return (
    <div className={classes.container}>
      <Avatar alt="News" src={avatarImg} className={classes.logo} />
      <Typography className={classes.title} variant="h6">
        {authUser ? 'Control Panel' : 'Login'}
      </Typography>
      {authUser ? <ControlPanel /> : <Login />}
    </div>
  )
}

export default Admin
