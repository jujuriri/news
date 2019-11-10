import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Typography, AppBar, Tabs, Tab } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  appbar: {
    boxShadow: 'unset',
  },
}))

const ReadByTabPanel = ({ children, value, idx }) => {
  return (
    <Typography component="div" role="tabpanel" hidden={value !== idx}>
      {children}
    </Typography>
  )
}

ReadByTabPanel.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
  idx: PropTypes.number.isRequired,
}

const ReadByTabs = ({ children }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  const tabs = []
  const panels = []
  for (let i = 0; i < children.length; i += 1) {
    tabs.push(<Tab label={`${children[i].props.readBy}`} key={`Tab-${children[i].props.readBy}`} />)
    panels.push(
      <ReadByTabPanel value={value} idx={i} key={`TabPanel-${children[i].props.readBy}`}>
        {children[i]}
      </ReadByTabPanel>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.appbar}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
          {tabs}
        </Tabs>
      </AppBar>
      {panels}
    </div>
  )
}

ReadByTabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default ReadByTabs
