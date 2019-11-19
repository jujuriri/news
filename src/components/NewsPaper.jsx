import React, { useContext, useState, useEffect, useRef } from 'react'
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
    if (
      prevSelectedCtry.current !== selectedCtry &&
      prevSelectedCat.current !== selectedCat &&
      selectedCtry !== '' &&
      selectedCat !== ''
    ) {
      console.log('前國家', prevSelectedCtry.current, '現國家', selectedCtry)
      console.log('前分類', prevSelectedCtry.current, '現分類', selectedCat)
      getNewsCtryCat(selectedCtry, selectedCat)
    }
    if (newsListCtryCat.length > 0) {
      setIsCtryCatLoading(false)
      setIsAdminSetting(false)
    }
    // return () => {
    //   setSelectedCtry('')
    //   setSelectedCat('')
    // }
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
    if (prevSelectedPubl.current !== selectedPubl && selectedPubl !== '') {
      getNewsPubl(selectedPubl)
    }
    if (newsListPubl.length > 0) {
      setIsPublLoading(false)
      setIsAdminSetting(false)
    }
    // return () => {
    //   setSelectedPubl('')
    // }
  }, [
    firestore.adminPublisher,
    isAdminSetting,
    news.publishers,
    newsListPubl.length,
    readBy,
    selectedPubl,
  ])

  const checkImgUrl = url => {
    if (!url) {
      return 'https://source.unsplash.com/random/300x400'
    }
    return url
  }

  const changeCtry = value => {
    if (!isAdminSetting) {
      setSelectedCtry(value)
    }
  }

  const changeCat = value => {
    if (!isAdminSetting) {
      setSelectedCat(value)
    }
  }

  const changePubl = value => {
    if (!isAdminSetting) {
      setSelectedPubl(value)
    }
  }

  return (
    <div>
      {readBy === 'Country and Category' && !isCtryCatLaoding && (
        <>
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
            changeHandler={changePubl}
          />
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
// 加上 useCallback 要正確使用
// 排序功能

NewsPaper.propTypes = {
  readBy: PropTypes.string.isRequired,
}

export default NewsPaper
