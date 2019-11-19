import React, { useContext, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Button } from '@material-ui/core'
import { NewsContext, FirestoreContext } from '../context/context'
import Selector from './Selector'
import Masonry from './Masonry'
import NewsCard from './NewsCard'
import SortByBtns from './SortByBtns'

const NewsPaper = ({ readBy }) => {
  const news = useContext(NewsContext)
  const firestore = useContext(FirestoreContext)
  const [isAdminSetting, setIsAdminSetting] = useState(true)
  const [selectedCtry, setSelectedCtry] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [selectedPubl, setSelectedPubl] = useState('')
  const [isCtryCatLaoding, setIsCtryCatLoading] = useState(true)
  const [isPublLaoding, setIsPublLoading] = useState(true)
  const [newsListCtryCat, setNewsListCtryCat] = useState([])
  const [newsListPubl, setNewsListPubl] = useState([])

  useEffect(() => {
    console.log('NewsPaper here.')
  }, [])

  // useRef to store prevState or prevProps
  const prevSelectedCtry = useRef(selectedCtry)
  const prevSelectedCat = useRef(selectedCat)
  const prevSelectedPubl = useRef(selectedPubl)

  // Init: Get News by Ctry & Cat
  useEffect(() => {
    const getNewsCtryCat = async (ctry, cat, pageNum = null) => {
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
            page: pageNum,
          },
        }
      )
      setNewsListCtryCat(res.data.articles)
    }
    if (firestore.adminCountry !== '' && firestore.adminCategory !== '' && isAdminSetting) {
      setSelectedCtry(firestore.adminCountry)
      setSelectedCat(firestore.adminCategory)
    }
    if (prevSelectedCtry.current !== selectedCtry && prevSelectedCat.current !== selectedCat) {
      getNewsCtryCat(firestore.adminCountry, firestore.adminCategory)
    }
    if (newsListCtryCat.length > 0) {
      setIsCtryCatLoading(false)
      setIsAdminSetting(false)
    }
    return () => {
      setSelectedCtry('')
      setSelectedCat('')
    }
  }, [
    firestore.adminCountry,
    firestore.adminCategory,
    news.countries,
    readBy,
    selectedCtry,
    selectedCat,
    newsListCtryCat.length,
    isAdminSetting,
  ])

  // Init: Get News by Publisher
  useEffect(() => {
    const getNewsPubl = async (publ, pageNum = null) => {
      const sourceId = Array.from(news.publishers)
        .filter(publisher => publisher.name === publ)
        .map(selected => selected.id)
      const res = await axios(
        `https://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`,
        {
          params: {
            sources: sourceId,
            page: pageNum,
          },
        }
      )
      setNewsListPubl(res.data.articles)
    }
    if (firestore.adminPublisher !== '' && isAdminSetting) {
      setSelectedPubl(firestore.adminPublisher)
    }
    if (prevSelectedPubl.current !== selectedPubl) {
      getNewsPubl(firestore.adminPublisher)
    }
    if (newsListPubl.length > 0) {
      setIsPublLoading(false)
      setIsAdminSetting(false)
    }
    return () => {
      setSelectedPubl('')
    }
  }, [firestore.adminPublisher, isAdminSetting, news.publishers, newsListPubl.length, readBy, selectedPubl])

  const checkImgUrl = url => {
    if (!url) {
      return 'https://source.unsplash.com/random/300x400'
    }
    return url
  }

  return (
    <div>
      {readBy === 'Country and Category' && !isCtryCatLaoding && (
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
          <Button variant="outlined">Search</Button>
          <SortByBtns />
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
      {readBy === 'Publisher' && !isPublLaoding && (
        <>
          <Selector
            name="Publisher"
            options={news.publishers}
            selected={selectedPubl}
            changeHandler={val => setSelectedPubl(val)}
          />
          <Button variant="outlined">Search</Button>
          <SortByBtns />
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
      {(isCtryCatLaoding || isPublLaoding) && <p>Loading</p>}
    </div>
  )
}

// 當捲軸到底部時，如果 total Result 大於目前 NewsList 長度
// fetch 下一頁，然後要 Loading 圖，然後把下一頁加到 NewsList 裡

// 排序功能

// 客人自己搜尋功能

NewsPaper.propTypes = {
  readBy: PropTypes.string.isRequired,
}

export default NewsPaper
