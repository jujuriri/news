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
      <p>Control Panel</p>
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
