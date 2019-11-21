import React, { useContext, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { makeStyles } from '@material-ui/core'
import { usePrevious, useWindowWidth } from '../customHooks'
import { NewsContext, FirestoreContext } from '../context/context'
import Selector from './Selector'
import Masonry from './Masonry'
import NewsCard from './NewsCard'
import SortBtns from './SortBtns'

const useStyles = makeStyles(theme => ({
  newsPaper: {
    margin: theme.spacing(0, 1),
    padding: theme.spacing(0, 1),
  },
}))

const NewsPaper = ({ readBy }) => {
  const news = useContext(NewsContext)
  const firestore = useContext(FirestoreContext)
  const classes = useStyles()

  const [isAdminSetting, setIsAdminSetting] = useState(true)
  const [selectedCtry, setSelectedCtry] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [selectedPubl, setSelectedPubl] = useState('')
  const [isCtryCatLaoding, setIsCtryCatLoading] = useState(true)
  const [isPublLaoding, setIsPublLoading] = useState(true)
  const [newsListCtryCat, setNewsListCtryCat] = useState([])
  const [newsListPubl, setNewsListPubl] = useState([])

  useEffect(() => {
    console.log('Home here!')
  }, [])

  // RWD
  const windowWidth = useWindowWidth()
  const [colNum, setColNum] = useState(0)
  useEffect(() => {
    if (windowWidth < 600) {
      setColNum(1)
    } else if (windowWidth < 960) {
      setColNum(2)
    } else if (windowWidth < 1280) {
      setColNum(3)
    } else if (windowWidth < 1920) {
      setColNum(4)
    }
  }, [windowWidth])

  const prevSelectedCtry = usePrevious(selectedCtry)
  const prevSelectedCat = usePrevious(selectedCat)
  const prevSelectedPubl = usePrevious(selectedPubl)

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
    if (selectedCtry !== '' && selectedCat !== '') {
      if (prevSelectedCtry !== selectedCtry || prevSelectedCat !== selectedCat) {
        getNewsCtryCat(selectedCtry, selectedCat)
      }
    }
    if (newsListCtryCat.length > 0) {
      setIsCtryCatLoading(false)
      setIsAdminSetting(false)
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
    prevSelectedCtry,
    prevSelectedCat,
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
    if (prevSelectedPubl !== selectedPubl && selectedPubl !== '') {
      getNewsPubl(selectedPubl)
    }
    if (newsListPubl.length > 0) {
      setIsPublLoading(false)
      setIsAdminSetting(false)
    }
  }, [
    firestore.adminPublisher,
    isAdminSetting,
    news.publishers,
    newsListPubl.length,
    prevSelectedPubl,
    readBy,
    selectedPubl,
  ])

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

  const sortByDate = () => {
    console.log('sortByDate')
  }

  const sortByTitle = () => {
    console.log('sortByTitle')
  }

  return (
    <div className={classes.newsPaper}>
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
          <SortBtns byDate={() => sortByDate()} byTitle={sortByTitle()} />
          <Masonry colNum={colNum}>
            {newsListCtryCat.map((n, i) => {
              return (
                <NewsCard
                  key={`NewsCard-CC-${i}`}
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
      {readBy === 'Publisher' && !isPublLaoding && (
        <>
          <Selector
            name="Publisher"
            options={news.publishers}
            selected={selectedPubl}
            changeHandler={changePubl}
          />
          <SortBtns byDate={() => sortByDate()} byTitle={() => sortByTitle()} />
          <Masonry colNum={colNum}>
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
