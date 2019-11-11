import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import ReadByTabs from './ReadByTabs'
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
  },
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
    width: 100,
  },
}))

const Home = () => {
  const classes = useStyles()

  const readBy = ['Country and Category', 'Publisher']

  useEffect(() => {
    console.log('Home here!')
  }, [])

  return (
    <div className={classes.container}>
      <ReadByTabs>
        {readBy.map(rb => {
          return <NewsPaper readBy={rb} key={`NewsPaper-${rb}`} />
        })}
      </ReadByTabs>
    </div>
  )
}

export default Home
