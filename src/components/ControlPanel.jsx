import React from 'react'
import { useFirebase } from '../firebase'
import { makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
    width: 300,
  },
}))

function ControlPanel() {
  const classes = useStyles()
  return (
    <>
      <p>Control Panel</p>
      <p>Publishers</p>
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
    </>
  )
}

export default ControlPanel
