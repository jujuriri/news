import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useFirebase } from './firebase'

export const AdminContext = createContext()
export const AdminProvider = AdminContext.provider

export const NewsContext = createContext()
export const NewsProvider = NewsContext.provider

export const Provider = ({ children }) => {
  const [countries, setCountries] = useState({})
  const [publishers, setPublishers] = useState({})
  const [categories, setCategories] = useState({})

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
    useFirebase.getSettings()
  }, [])

  return (
    <AdminProvider value="YOYOYOYOYOYOO">
      <NewsProvider value={{ countries, publishers, categories }}>{children}</NewsProvider>
    </AdminProvider>
  )
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
}
