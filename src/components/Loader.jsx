import React from 'react'
import { makeStyles, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    justifyContent: 'center',
    marginTop: theme.spacing(6),
  },
}))

const Loader = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}

export default Loader
