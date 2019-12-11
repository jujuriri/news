import React from 'react'
import { makeStyles, Fab } from '@material-ui/core'
import ArrowUpward from '@material-ui/icons/ArrowUpward'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
    position: 'fixed',
    right: 0,
    bottom: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const ScrollToTop = () => {
  const classes = useStyles()

  const handleToTop = () => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className={classes.button}>
      <Fab size="small" aria-label="add" onClick={() => handleToTop()}>
        <ArrowUpward />
      </Fab>
    </div>
  )
}

export default ScrollToTop
