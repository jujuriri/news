import React, { useContext } from 'react'
import { NewsContext } from '../context/news'
import { makeStyles, Button } from '@material-ui/core'
import { useFirebase } from '../firebase'
import Selector from './Selector'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
    width: 300,
  },
}))

function ControlPanel() {
  const classes = useStyles()
  const news = useContext(NewsContext)
  return (
    <div className={classes.container}>
      <p>Control Panel</p>
      <Selector name="Publisher" options={news.publishers} />
      <p>Countries</p>
      <p>Categories</p>
      <Button
        className={classes.button}
        variant="outlined"
        fullWidth
        onClick={() => console.log('saved!')}
      >
        {/* onClick={() => useFirebase.saveSettings()} */}
        Save
      </Button>
      <Button
        className={classes.button}
        variant="outlined"
        fullWidth
        onClick={() => useFirebase.logOut()}
      >
        Log Out
      </Button>
    </div>
  )
}

export default ControlPanel
