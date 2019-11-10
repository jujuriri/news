import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { NewsContext, FirestoreContext } from '../context/context'
import Selector from './Selector'
import Masonry from './Masonry'
import NewsCard from './NewsCard'
import SortByBtns from './SortByBtns'

const NewsPaper = ({ readBy }) => {
  const news = useContext(NewsContext)
  const firestore = useContext(FirestoreContext)

  const [selectedCtry, setSelectedCtry] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [selectedPubl, setSelectedPubl] = useState('')
  const [newsListCtryCat, setNewsListCtryCat] = useState([])
  const [newsListPubl, setNewsListPubl] = useState([])

  useEffect(() => {
    console.log('NewsPaper here.')
  }, [])

  useEffect(() => {
    const getNewsCtryCat = async (ctry, cat) => {
      const ctryCode = Array.from(news.countries)
        .filter(country => country.name === ctry)
        .map(selected => selected.code)
      // call News API (/top-headlines) based on selected options or admin's Settings.
      const res = await axios(
        `https://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`,
        {
          params: {
            country: ctryCode,
            category: cat,
          },
        }
      )
      setNewsListCtryCat(res.data.articles)
    }
    const getNewsPubl = async publ => {
      const sourceId = Array.from(news.publishers)
        .filter(publisher => publisher.name === publ)
        .map(selected => selected.id)
      const res = await axios(
        `https://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`,
        {
          params: {
            sources: sourceId,
          },
        }
      )
      setNewsListPubl(res.data.articles)
    }

    if (
      firestore.adminCountry !== '' &&
      firestore.adminCategory !== '' &&
      readBy === 'Country and Category'
    ) {
      getNewsCtryCat(firestore.adminCountry, firestore.adminCategory)
    } else if (firestore.adminPublisher !== '' && readBy === 'Publisher') {
      getNewsPubl(firestore.adminPublisher)
    }
  }, [
    firestore.adminCategory,
    firestore.adminCountry,
    firestore.adminPublisher,
    news.countries,
    news.publishers,
    readBy,
  ])

  const checkImgUrl = url => {
    if (!url) {
      return 'https://source.unsplash.com/random/300x400'
    }
    return url
  }

  return (
    <div>
      {readBy === 'Country and Category' && (
        <>
          <Selector
            name="Country"
            options={news.countries}
            selected={selectedCtry}
            changeHandler={val => setSelectedCtry(val)}
          />
          <Selector
            name="Category"
            options={news.categories}
            selected={selectedCat}
            changeHandler={val => setSelectedCat(val)}
          />
          <SortByBtns sortNews={() => console.log('SortNews Func')} />
          <Masonry>
            {newsListCtryCat.map((n, i) => {
              return (
                <NewsCard
                  key={`NewsCard-CC-${i}`}
                  imgUrl={checkImgUrl(n.urlToImage)}
                  newsTitle={n.title}
                  newsSummary={n.description}
                  publishedAt={n.publishedAt}
                  sourceName={n.source.name}
                />
              )
            })}
          </Masonry>
        </>
      )}
      {readBy === 'Publisher' && (
        <>
          <Selector
            name="Publisher"
            options={news.publishers}
            selected={selectedPubl}
            changeHandler={val => setSelectedPubl(val)}
          />
          <Masonry>
            {newsListPubl.map((n, i) => {
              return (
                <NewsCard
                  key={`NewsCard-P-${i}`}
                  imgUrl={n.urlToImage}
                  newsTitle={n.title}
                  newsSummary={n.description}
                  publishedAt={n.publishedAt}
                  sourceName={n.source.name}
                />
              )
            })}
          </Masonry>
        </>
      )}
    </div>
  )
}

NewsPaper.propTypes = {
  readBy: PropTypes.string.isRequired,
}

export default NewsPaper
