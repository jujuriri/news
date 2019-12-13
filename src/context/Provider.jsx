import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { NewsContext, FirestoreContext } from './context'
import useFirebase from '../firebase'

const Provider = ({ children }) => {
  const [countries, setCountries] = useState({})
  const [publishers, setPublishers] = useState({})
  const [categories, setCategories] = useState({})
  const [adminCC, setAdminCC] = useState({})
  const [adminPubl, setAdminPubl] = useState('')

  useEffect(() => {
    // Fetch data from News API (/source), just for displaying options of selectors.
    const getOptions = async () => {
      const res = await axios(
        `https://newsapi.org/v2/sources?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      )
      const categoriesSet = new Set([
        'business',
        'entertainment',
        'general',
        'health',
        'science',
        'sports',
        'technology',
      ])
      const countriesSet = new Set([
        { code: 'ae', name: 'United Arab Emirates' },
        { code: 'ar', name: 'Argentina' },
        { code: 'at', name: 'Austria' },
        { code: 'au', name: 'Australia' },
        { code: 'be', name: 'Belgium' },
        { code: 'bg', name: 'Bulgaria' },
        { code: 'br', name: 'Brazil' },
        { code: 'ca', name: 'Canada' },
        { code: 'ch', name: 'Switzerland' },
        { code: 'cn', name: 'China' },
        { code: 'co', name: 'Colombia' },
        { code: 'cu', name: 'Cuba' },
        { code: 'cz', name: 'Czech Republic' },
        { code: 'de', name: 'Germany' },
        { code: 'eg', name: 'Egypt' },
        { code: 'fr', name: 'France' },
        { code: 'gb', name: 'United Kingdom' },
        { code: 'gr', name: 'Greece' },
        { code: 'hk', name: 'Hong Kong' },
        { code: 'hu', name: 'Hungary' },
        { code: 'id', name: 'Indonesia' },
        { code: 'ie', name: 'Ireland' },
        { code: 'il', name: 'Israel' },
        { code: 'in', name: 'India' },
        { code: 'it', name: 'Italy' },
        { code: 'jp', name: 'Japan' },
        { code: 'kr', name: 'Korea' },
        { code: 'lt', name: 'Lithuania' },
        { code: 'lv', name: 'Latvia' },
        { code: 'ma', name: 'Morocco' },
        { code: 'mx', name: 'Mexico' },
        { code: 'my', name: 'Malaysia' },
        { code: 'ng', name: 'Nigeria' },
        { code: 'nl', name: 'Netherlands' },
        { code: 'no', name: 'Norway' },
        { code: 'nz', name: 'New Zealand' },
        { code: 'ph', name: 'Philippines' },
        { code: 'pl', name: 'Poland' },
        { code: 'pt', name: 'Portugal' },
        { code: 'ro', name: 'Romania' },
        { code: 'rs', name: 'Serbia' },
        { code: 'ru', name: 'Russian Federation' },
        { code: 'sa', name: 'Saudi Arabia' },
        { code: 'se', name: 'Sweden' },
        { code: 'sg', name: 'Singapore' },
        { code: 'si', name: 'Slovenia' },
        { code: 'sk', name: 'Slovakia' },
        { code: 'th', name: 'Thailand' },
        { code: 'tr', name: 'Turkey' },
        { code: 'tw', name: 'Taiwan' },
        { code: 'ua', name: 'Ukraine' },
        { code: 'us', name: 'United States' },
        { code: 've', name: 'Venezuela' },
        { code: 'za', name: 'South Africa' },
      ])
      const publishersSet = new Set(
        res.data.sources.map(source => {
          return { name: source.name, id: source.id }
        })
      )
      setCategories(categoriesSet)
      setCountries(countriesSet)
      setPublishers(publishersSet)
    }

    const getFiresotre = async () => {
      const doc = await useFirebase.getSettings()
      setAdminCC({ ctry: doc.data().country, cat: doc.data().category })
      setAdminPubl(doc.data().publisher)
    }

    getOptions()
    getFiresotre()
  }, [])

  const NewsProvider = NewsContext.Provider
  const FirestoreProvider = FirestoreContext.Provider

  return (
    <FirestoreProvider value={{ adminCC, adminPubl }}>
      <NewsProvider value={{ countries, publishers, categories }}>{children}</NewsProvider>
    </FirestoreProvider>
  )
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Provider
