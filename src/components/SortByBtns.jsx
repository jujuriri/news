import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Button, Typography } from '@material-ui/core'

const SortByBtns = () => {
  return (
    <>
      <Button variant="outlined">Date</Button>
      <Button variant="outlined">Title (A-Z)</Button>
    </>
  )
}

export default SortByBtns
