import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  mansory: {
    display: 'flex',
    margin: 'auto',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  mansoryCols: {
    margin: theme.spacing(0, 1),
    flex: '0 1 auto',
  },
}))

const Masonry = ({ colNum, children }) => {
  const classes = useStyles()
  // Create columns based on colNum, prepare for mansory layout.
  const cols = Array.from({ length: colNum }, () => [])
  // Fill Cols
  if (cols[0] && children.length > 0) {
    children.forEach((child, i) => cols[i % colNum].push(child))
  } else {
    console.log('cols[0] undefined')
  }
  // Because I don't want to install short-id here, so I came up with this solution myself.
  let mansoryColKey = 0

  return (
    <div className={classes.mansory}>
      {cols.map(c => {
        mansoryColKey += 1
        return (
          <div key={`mansoryCol-${mansoryColKey}`} className={classes.mansoryCols}>
            {c}
          </div>
        )
      })}
    </div>
  )
}

Masonry.propTypes = {
  colNum: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default Masonry
