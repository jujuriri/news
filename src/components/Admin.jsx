import React from 'react'
import { makeStyles, Typography, Avatar } from '@material-ui/core'
import useFirebase from '../firebase'
import { useFirebaseAuth } from '../customHooks'
import ControlPanel from './ControlPanel'
import Login from './Login'
import adminIcon from '../imgs/avatar-admin.svg'
import guestIcon from '../imgs/avatar-guest.svg'

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
}))

function Admin() {
  const classes = useStyles()
  const authUser = useFirebaseAuth(useFirebase)
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
