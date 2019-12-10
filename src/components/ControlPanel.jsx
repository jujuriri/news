import React, { useContext, useState } from 'react'
import { makeStyles, Button } from '@material-ui/core'
import { NewsContext } from '../context/context'
import useFirebase from '../firebase'
import Selector from './Selector'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    flex: '1 1 auto',
    textTransform: 'none',
  },
}))

function ControlPanel() {
  const classes = useStyles()
  const news = useContext(NewsContext)

  const [selectedCtry, setSelectedCtry] = useState('')
  const [selectedPubl, setSelectedPubl] = useState('')
  const [selectedCat, setSelectedCat] = useState('')

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
    setSelectedCat('')
    setSelectedCtry('')
    setSelectedPubl('')
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
    </div>
  )
}

export default ControlPanel
