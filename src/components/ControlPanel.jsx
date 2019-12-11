import React, { useContext, useState, useEffect } from 'react'
import { makeStyles, Button, ListItem, ListItemText } from '@material-ui/core'
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

  const saveAdminSettings = () => {
    if (selectedCat !== '' && selectedCtry !== '' && selectedPubl !== '') {
      const admin = {
        category: selectedCat,
        publisher: selectedPubl,
        country: selectedCtry,
      }
      useFirebase
        .saveSettings(admin)
        .then(console.log('options has been saved!'))
        .catch(err => {
          throw new Error(err)
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
