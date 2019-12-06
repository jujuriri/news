import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
}))

const Selector = ({ name, options, changeHandler, selected }) => {
  const classes = useStyles()
  const inputLabel = useRef(null)

  const [labelWidth, setLabelWidth] = useState(0)
  const [hasErr, setHasErr] = useState(false)

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const selectValid = e => {
    changeHandler(e.target.value)
    if (e.target.value === '') {
      setHasErr(true)
    } else {
      setHasErr(false)
    }
  }

  return (
    <FormControl variant="outlined" className={classes.formControl} error={hasErr}>
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        {name}
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={selected}
        onChange={e => selectValid(e)}
        labelWidth={labelWidth}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Array.from(options).map((option, i) => {
          return option.name ? (
            <MenuItem key={`option-${i}`} value={option.name}>
              {option.name}
            </MenuItem>
          ) : (
            <MenuItem key={`option-${i}`} value={option}>
              {option}
            </MenuItem>
          )
        })}
      </Select>
      {hasErr && <FormHelperText>Required.</FormHelperText>}
    </FormControl>
  )
}

Selector.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.object,
  changeHandler: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
}

export default Selector
