import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { NewsContext, FirestoreContext } from './context'
import { useFirebase } from '../firebase'

const Provider = ({ children }) => {
  const [countries, setCountries] = useState({})
  const [publishers, setPublishers] = useState({})
  const [categories, setCategories] = useState({})
  const [adminCountry, setAdminCountry] = useState('')
  const [adminPublisher, setAdminPublisher] = useState('')
  const [adminCategory, setAdminCategory] = useState('')

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

    const getFiresotre = async () => {
      const doc = await useFirebase.getSettings()
      console.log('getFirestore: Settings got at Provider →', doc.data())
      setAdminCountry(doc.data().country)
      setAdminPublisher(doc.data().publisher)
      setAdminCategory(doc.data().category)
    }

    getOptions()
    getFiresotre()
  }, [])

  const NewsProvider = NewsContext.Provider
  const FirestoreProvider = FirestoreContext.Provider

  return (
    <FirestoreProvider value={{ adminCountry, adminPublisher, adminCategory }}>
      <NewsProvider value={{ countries, publishers, categories }}>{children}</NewsProvider>
    </FirestoreProvider>
  )
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Provider
