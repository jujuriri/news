import React, { useContext, useState, useEffect } from 'react'
// import axios from 'axios'
// import { useFirebase } from '../firebase'
import { makeStyles, Button } from '@material-ui/core'
import { NewsContext } from '../context/news'
import Selector from './Selector'

// Get admin settings from firestore first,
// then get news data based on that settings.
// Guests can change settings, but once they leave or refresh
// settings will reset (change back to admin's setting).

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
    width: 100,
  },
}))

const Home = () => {
  const news = useContext(NewsContext)
  const classes = useStyles()

  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedPublisher, setSelectedPublisher] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    // useFirebase.getSettings()
    console.log('news Context')
    console.log('Home here!')
  }, [])

  const changeCountry = value => {
    setSelectedCountry(value)
  }

  const changeCategory = value => {
    setSelectedCategory(value)
  }

  const chagePublisher = value => {
    setSelectedPublisher(value)
  }

  return (
    <div className={classes.container}>
      <div>
        <Selector
          name="Publisher"
          options={news.publishers}
          selected={selectedPublisher}
          changeHandler={chagePublisher}
        />
        <Selector
          name="Country"
          options={news.countries}
          selected={selectedCountry}
          changeHandler={changeCountry}
        />
        <Selector
          name="Category"
          options={news.categories}
          selected={selectedCategory}
          changeHandler={changeCategory}
        />
      </div>
      <div>
        <Button disabled className={classes.button}>
          Sort by :
        </Button>
        <Button className={classes.button} variant="outlined" fullWidth>
          Date
        </Button>
        <Button className={classes.button} variant="outlined" fullWidth>
          Title
        </Button>
      </div>
    </div>
  )
}

export default Home
