import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { NewsContext, FirestoreContext } from './context'
import { useFirebase } from '../firebase'

const Provider = ({ children }) => {
  const [countries, setCountries] = useState({})
  const [publishers, setPublishers] = useState({})
  const [categories, setCategories] = useState({})
  const [adminSettings, setAdminSettings] = useState({})

  useEffect(() => {
    // Fetch data from News API (/source), just for displaying options of selectors.
    const getOptions = async () => {
      const res = await axios(
        `https://newsapi.org/v2/sources?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
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
    useFirebase.getSettings().then(doc => {
      console.log('Settings got at Provider:', doc.data())
      setAdminSettings(doc.data())
    })
  }, [])

  const NewsProvider = NewsContext.Provider
  const FirestoreProvider = FirestoreContext.Provider

  return (
    <FirestoreProvider value={{ adminSettings }}>
      <NewsProvider value={{ countries, publishers, categories }}>{children}</NewsProvider>
    </FirestoreProvider>
  )
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Provider
