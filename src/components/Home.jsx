import React, { useContext, useState, useEffect } from 'react'
import { makeStyles, Button } from '@material-ui/core'
import axios from 'axios'
import { useFirebase } from '../firebase'
// import { FirebaseContext } from '../index'
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
    width: 300,
  },
}))

const Home = () => {
  // const firebase = useContext(FirebaseContext)
  const classes = useStyles()

  const [countries, setCountries] = useState({})
  const [publishers, setPublishers] = useState({})
  const [categories, setCategories] = useState({})
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedPublisher, setSelectedPublisher] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    const getOptions = async () => {
      const res = await axios(
        'https://newsapi.org/v2/sources?apiKey=3c44d2e5c78b40e390758064d60eee87'
      )
      const categoriesSet = new Set(res.data.sources.map(source => source.category))
      const countriesSet = new Set(res.data.sources.map(source => source.country))
      const publishersSet = new Set(
        res.data.sources.map(source => {
          return { name: source.name, domain: source.url }
        })
      )
      setCategories(categoriesSet)
      setCountries(countriesSet)
      setPublishers(publishersSet)
    }
    getOptions()
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
      <h1>Home(Public)</h1>
      <p>A-Z of news titles</p>
      <p>Latest to Oldest published dates</p>
      <div>
        <Selector
          name="Publisher"
          options={publishers}
          selected={selectedPublisher}
          changeHandler={chagePublisher}
        />
        <Selector
          name="Country"
          options={countries}
          selected={selectedCountry}
          changeHandler={changeCountry}
        />
        <Selector
          name="Category"
          options={categories}
          selected={selectedCategory}
          changeHandler={changeCategory}
        />
      </div>
      <div>
        <p>Sort by: </p>
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
