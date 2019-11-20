import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import NewsPaper from './NewsPaper'

// Get admin settings from firestore first,
// then get news data based on that settings.
// Guests can change settings, but once they leave or refresh
// settings will reset back to admin's setting.

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    padding: theme.spacing(0, 1),
  },
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
    width: 100,
  },
}))

const Home = () => {
  const classes = useStyles()

  const [readBy, setReadBy] = useState('')
  const location = useLocation()

  useEffect(() => {
    console.log('Home here! location: ', location)
    if (location.pathname === '/') {
      setReadBy('Country and Category')
    } else if (location.pathname === '/publ') {
      setReadBy('Publisher')
    }
  }, [location])

  return (
    <div className={classes.container}>
      <NewsPaper readBy={readBy} />
    </div>
  )
}

export default Home
