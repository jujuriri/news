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
import Loader from './Loader'

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
  dialogBtn: {
    textTransform: 'none',
  },
}))

function ControlPanel() {
  const classes = useStyles()
  const controlPanelMsg = 'Current settings is now reflected on the public pages.'
  const firestore = useContext(FirestoreContext)
  const news = useContext(NewsContext)

  const [selectedCtry, setSelectedCtry] = useState('')
  const [selectedPubl, setSelectedPubl] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [saveMsg, setSaveMsg] = useState('')
  const [saveTitle, setSaveTitle] = useState('')
  const [saveHasErr, setSaveHasErr] = useState(false)

  useEffect(() => {
    if (firestore.adminCC.ctry && firestore.adminCC.cat && firestore.adminPubl !== '') {
      setSelectedCtry(firestore.adminCC.ctry)
      setSelectedCat(firestore.adminCC.cat)
      setSelectedPubl(firestore.adminPubl)
      setIsLoading(false)
    }
  }, [firestore.adminCC.cat, firestore.adminCC.ctry, firestore.adminPubl])

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
    window.location.href = `${process.env.PUBLIC_URL}/`
  }

  const saveAdminSettings = () => {
    if (selectedCat !== '' && selectedCtry !== '' && selectedPubl !== '') {
      const admin = {
        category: selectedCat,
        publisher: selectedPubl,
        country: selectedCtry,
      }
      setIsDialogOpen(true)
      setIsLoading(true)
      useFirebase
        .saveSettings(admin)
        .then(() => {
          setSaveTitle(`Settings Saved !`)
          setSaveMsg(
            `New settings will be applied to your (and guest's) next visit. (or you can refresh website right now.)`
          )
          setSaveHasErr(false)
          setIsLoading(false)
        })
        .catch(err => {
          setSaveTitle(`Opps !`)
          setSaveMsg(`There is something wrong, error: ${err}`)
          setSaveHasErr(true)
          setIsLoading(false)
        })
    } else {
      // Required field is left empty.
      return 0
    }
    // Arrow function has to return something at the end
    return 0
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
          <Button
            className={classes.button}
            variant="outlined"
            fullWidth
            onClick={saveAdminSettings}
          >
            Save
          </Button>
          <Dialog open={isDialogOpen} onClose={closeDialog}>
            <DialogTitle id="dialog-Admin">{saveTitle}</DialogTitle>
            <DialogContent dividers>
              <DialogContentText id="dialog-description">{saveMsg}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button className={classes.dialogBtn} color="primary" onClick={closeDialog}>
                Got it
              </Button>
              {!saveHasErr && (
                <Button className={classes.dialogBtn} color="primary" onClick={refresh}>
                  Refresh now
                </Button>
              )}
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
      )}
    </>
  )
}

export default ControlPanel
