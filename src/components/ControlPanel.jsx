import React, { useContext, useState, useEffect } from 'react'
import {
  makeStyles,
  Button,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'
import { NewsContext, FirestoreContext } from '../context/context'
import useFirebase from '../firebase'
import Selector from './Selector'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 0),
    flex: '1 1 auto',
    textTransform: 'none',
  },
  controlPanelMsg: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
}))

function ControlPanel() {
  const classes = useStyles()
  const controlPanelMsg = 'Settings will be reflected on the public pages.'
  const firestore = useContext(FirestoreContext)
  const news = useContext(NewsContext)

  const [selectedCtry, setSelectedCtry] = useState('')
  const [selectedPubl, setSelectedPubl] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    setSelectedCtry(firestore.adminCountry)
    setSelectedCat(firestore.adminCategory)
    setSelectedPubl(firestore.adminPublisher)
  }, [firestore.adminCategory, firestore.adminCountry, firestore.adminPublisher])

  const changeCtry = value => {
    setSelectedCtry(value)
  }

  const changeCat = value => {
    setSelectedCat(value)
  }

  const chagePubl = value => {
    setSelectedPubl(value)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const refresh = () => {
    console.log('eee')
  }

  const saveAdminSettings = () => {
    if (selectedCat !== '' && selectedCtry !== '' && selectedPubl !== '') {
      const admin = {
        category: selectedCat,
        publisher: selectedPubl,
        country: selectedCtry,
      }
      useFirebase
        .saveSettings(admin)
        .then(setIsDialogOpen(true))
        .catch(err => {
          console.log(err)
        })
    } else {
      console.log('選項都必填')
    }
  }

  return (
    <div>
      <Selector
        name="Publisher"
        options={news.publishers}
        selected={selectedPubl}
        changeHandler={chagePubl}
      />
      <Selector
        name="Country"
        options={news.countries}
        selected={selectedCtry}
        changeHandler={changeCtry}
      />
      <Selector
        name="Category"
        options={news.categories}
        selected={selectedCat}
        changeHandler={changeCat}
      />
      <Button className={classes.button} variant="outlined" fullWidth onClick={saveAdminSettings}>
        Save
      </Button>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle id="dialog-Admin">Settings Saved</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="dialog-description">
            New settings will be applied to your next visit. (or you can refresh whole website right
            now.)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog}>
            Ok (Do nothing)
          </Button>
          <Button color="primary" onClick={refresh}>
            Refresh website
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        className={classes.button}
        variant="outlined"
        fullWidth
        onClick={() => useFirebase.logOut()}
      >
        Log Out
      </Button>
      <ListItem className={classes.controlPanelMsg}>
        <ListItemText primary={controlPanelMsg} />
      </ListItem>
    </div>
  )
}

export default ControlPanel
