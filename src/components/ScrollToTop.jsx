import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
    width: 40,
    height: 40,
    borderRadius: '50%',
    position: 'fixed',
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const ScrollToTop = ({ movePx, delayMs }) => {
  const classes = useStyles()

  const scrollHandler = () => {
    console.log('top top top', movePx, delayMs)
  }

  return (
    <div className={classes.button}>
      <button type="button" onClick={() => scrollHandler()}>
        上
      </button>
      {/* <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab> */}
    </div>
  )
}

ScrollToTop.defaultProps = {
  movePx: 50,
  delayMs: 16.66,
}

ScrollToTop.propTypes = {
  movePx: PropTypes.number,
  delayMs: PropTypes.number,
}

export default ScrollToTop
