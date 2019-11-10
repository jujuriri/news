import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Button, Typography } from '@material-ui/core'

const SortByBtns = ({ sortNews }) => {
  return (
    <>
      <Typography>Sort By → </Typography>
      <Button variant="outlined" onClick={() => sortNews()}>
        Date
      </Button>
      <Button variant="outlined" onClick={() => sortNews()}>
        Title (A-Z)
      </Button>
    </>
  )
}

SortByBtns.propTypes = {
  sortNews: PropTypes.func.isRequired,
}

export default SortByBtns
