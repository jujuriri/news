import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export const NewsContext = createContext(null)
export const NewsProvider = ({ children }) => {
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
  }, [])

  return (
    <NewsContext.Provider value={{ countries, publishers, categories }}>
      {children}
    </NewsContext.Provider>
  )
}

NewsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
