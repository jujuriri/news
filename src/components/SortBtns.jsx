import React from 'react'
import PropTypes from 'prop-types'
import { Button, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  sortWrap: {
    margin: theme.spacing(1),
    padding: theme.spacing(1, 0),
    display: 'flex',
    alignItems: 'center',
  },
  sortLabel: {
    height: '100%',
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
  sortBtn: {
    margin: theme.spacing(0, 1),
    textTransform: 'none',
  },
}))

const SortBtns = ({ sortByDate, sortByTitle }) => {
  const classes = useStyles()
  return (
    <div className={classes.sortWrap}>
      <Typography className={classes.sortLabel}>Sort by</Typography>
      <Button variant="outlined" className={classes.sortBtn} onClick={() => sortByDate()}>
        Date
      </Button>
      <Button variant="outlined" className={classes.sortBtn} onClick={() => sortByTitle()}>
        Title (A-Z)
      </Button>
    </div>
  )
}

SortBtns.propTypes = {
  sortByDate: PropTypes.func.isRequired,
  sortByTitle: PropTypes.func.isRequired,
}

export default SortBtns
