import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles, Button } from '@material-ui/core'
import { NewsContext, FirestoreContext } from '../context/context'
import Selector from './Selector'

// Get admin settings from firestore first,
// then get news data based on that settings.
// Guests can change settings, but once they leave or refresh
// settings will reset back to admin's setting.

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
  const firestore = useContext(FirestoreContext)
  const classes = useStyles()

  const [selectedCtry, setSelectedCtry] = useState('')
  const [selectedPubl, setSelectedPubl] = useState('')
  const [selectedCat, setSelectedCat] = useState('')

  useEffect(() => {
    console.log('Home here!')
  }, [])

  useEffect(() => {
    const getNews = async (ctry, cat, publ) => {
      const domain = Array.from(news.publishers)
        .filter(publisher => {
          return publisher.name === publ
        })
        .map(selected => selected.domain)
      // call News API (/top-headlines) based on selected options or admin's Settings.
      const res = await axios(
        `https://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`,
        {
          params: {
            country: ctry,
            category: cat,
          },
        }
      )
      console.log('Top-Headlines res', res)
      console.log('Top-Headlines Domain', `${domain}`)
    }
    if (firestore.adminCategory !== '') {
      console.log('YOYOYOO')
      getNews(firestore.adminCountry, firestore.adminCategory, firestore.adminPublisher)
    } else {
      console.log('loading')
    }
  }, [firestore.adminCategory, firestore.adminCountry, firestore.adminPublisher, news.publishers])

  const changeCtry = value => {
    setSelectedCtry(value)
  }

  const changeCat = value => {
    setSelectedCat(value)
  }

  const chagePubl = value => {
    setSelectedPubl(value)
  }

  return (
    <div className={classes.container}>
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
        <Button className={classes.button} variant="outlined" fullWidth>
          Search
        </Button>
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
      <p>{`1111${firestore.adminCategory}`}</p>
    </div>
  )
}

export default Home
