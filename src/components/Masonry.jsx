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
}))

const Masonry = ({ colNum, children }) => {
  const classes = useStyles()
  const cols = {}
  const arranged = []
  // Create columns based on colNum
  for (let i = 0; i < colNum; i++) {
    cols[`col${i}`] = []
  }
  // Devide childrens to each column
  for (let i = 0; i < children.length; i++) {
    const colIdx = i % colNum
    cols[`col${colIdx}`].push(children[i])
  }
  // concat each column to an array in order to render
  for (let i = 0; i < 3; i++) {
    arranged.push(<div key={`col-${i}`}>{cols[`col${i}`]}</div>)
  }

  return <div className={classes.mansory}>{arranged}</div>
}

Masonry.defaultProps = {
  colNum: 3,
}

Masonry.propTypes = {
  colNum: PropTypes.number,
  children: PropTypes.node.isRequired,
}

export default Masonry
