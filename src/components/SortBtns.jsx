import React from 'react'
import { Button, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  sortLabel: {
    margin: theme.spacing(1, 1, 0, 1),
  },
  sortBtn: {
    margin: theme.spacing(1),
  },
}))

const SortBtns = (byDate, byTitle) => {
  console.log(byTitle)
  const classes = useStyles()
  return (
    <>
      <Typography className={classes.sortLabel}>Sort by</Typography>
      <Button variant="outlined" className={classes.sortBtn} onClick={() => byDate()}>
        Date
      </Button>
      <Button variant="outlined" className={classes.sortBtn} onClick={() => byTitle()}>
        Title (A-Z)
      </Button>
    </>
  )
}

export default SortBtns
