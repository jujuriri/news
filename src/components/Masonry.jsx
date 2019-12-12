import React, { useState, useEffect } from 'react'
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

  const [arranged, setArranged] = useState([])

  useEffect(() => {
    const cols = {}
    const arranging = []
    // Create columns based on colNum
    for (let i = 0; i < colNum; i += 1) {
      cols[`col${i}`] = []
    }
    // Devide childrens to each column
    for (let i = 0; i < children.length; i += 1) {
      const colIdx = i % colNum
      cols[`col${colIdx}`].push(children[i])
    }
    // concat each column to an array in order to render
    for (let i = 0; i < colNum; i += 1) {
      arranging.push(
        <div key={`col-${i}`} className={classes.mansoryCols}>
          {cols[`col${i}`]}
        </div>
      )
    }
    setArranged(arranging)
  }, [colNum, children, classes.mansoryCols])

  return <div className={classes.mansory}>{arranged}</div>
}

Masonry.propTypes = {
  colNum: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default Masonry
