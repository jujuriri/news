import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { makeStyles, Button } from '@material-ui/core'
import { usePrevious, useWindowWidth } from '../customHooks'
import { NewsContext, FirestoreContext } from '../context/context'
import Selector from './Selector'
import Masonry from './Masonry'
import NewsCard from './NewsCard'
import SortBtns from './SortBtns'
import Loader from './Loader'

const useStyles = makeStyles(theme => ({
  newsPaper: {
    margin: theme.spacing(0, 1),
    padding: theme.spacing(0, 1),
  },
  searchBar: {
    width: '100%',
    height: 72,
    display: 'flex',
    justifyContent: 'felx-start',
    alignItems: 'center',
  },
  searchBtn: {
    height: '77%',
    margin: theme.spacing(1),
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
  const [sortBy, setSortBy] = useState('Date')

  const prevSelectedCtry = usePrevious(selectedCtry)
  const prevSelectedCat = usePrevious(selectedCat)
  const prevSelectedPubl = usePrevious(selectedPubl)
  const prevSortBy = usePrevious(sortBy)

  // Wait Firebase
  useEffect(() => {
    if (
      firestore.adminCountry !== '' &&
      firestore.adminCategory !== '' &&
      firestore.adminPublisher !== ''
    ) {
      setSelectedCtry(firestore.adminCountry)
      setSelectedCat(firestore.adminCategory)
      setSelectedPubl(firestore.adminPublisher)
    }
  }, [firestore.adminCategory, firestore.adminCountry, firestore.adminPublisher])

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return
      console.log('Scroll to bottom!')
      if (readBy === 'Country and Category') {
        setIsCtryCatLoading(true)
      } else if (readBy === 'Publisher') {
        setIsPublLoading(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [readBy])

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
      if (res.data.articles.length > 0) {
        setNewsListCtryCat(res.data.articles)
        setIsCtryCatLoading(false)
        setIsAdminSetting(false)
      } else {
        throw new Error('No Articles. (CtryCat)')
      }
    }
    if (isAdminSetting && prevSelectedCtry !== selectedCtry && prevSelectedCat !== selectedCat) {
      getNewsCtryCat(selectedCtry, selectedCat)
    }
    if (prevSortBy !== sortBy && readBy === 'Country and Category') {
      if (sortBy === 'Date') {
        console.log('地方日期換換換')
      } else if (sortBy === 'Title') {
        console.log('地方標題換換換')
        let lang
        if (selectedCtry === 'Taiwan') {
          lang = 'zh-Hant'
        } else if (selectedCtry === 'Japan') {
          lang = 'jp'
        } else {
          lang = null
        }
        const unSortNews = [...newsListCtryCat]
        const sortedNews = unSortNews.sort((a, b) => {
          return a.title.localeCompare(b.title, `${lang}`)
        })
        setNewsListCtryCat(sortedNews)
      }
    }
  }, [
    firestore.adminCategory,
    firestore.adminCountry,
    isAdminSetting,
    news.countries,
    newsListCtryCat,
    prevSelectedCat,
    prevSelectedCtry,
    prevSortBy,
    readBy,
    selectedCat,
    selectedCtry,
    sortBy,
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
      if (res.data.articles.length > 0) {
        setNewsListPubl(res.data.articles)
        setIsPublLoading(false)
        setIsAdminSetting(false)
      } else {
        throw new Error('No Articles. (Publ)')
      }
    }
    if (isAdminSetting && readBy === 'Publisher') {
      getNewsPubl(selectedPubl)
    }
    if (prevSortBy !== sortBy && readBy === 'Publisher') {
      if (sortBy === 'Date') {
        console.log('出版商日期換換換')
      } else if (sortBy === 'Title') {
        console.log('出版商標題換換換')
        const unSortNews = [...newsListPubl]
        const sortedNews = unSortNews.sort((a, b) => {
          return a.title.localeCompare(b.title)
        })
        setNewsListPubl(sortedNews)
      }
    }
  }, [
    firestore.adminPublisher,
    isAdminSetting,
    news.publishers,
    newsListPubl,
    prevSortBy,
    readBy,
    selectedPubl,
    sortBy,
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

  // const userSearch = (readBy, userSetting) {
  //   if (readBy === 'Country and Category') {
  //     getNewsCtryCat
  //   }
  // }

  const sortByDate = () => {
    console.log('sortByDate')
    setSortBy('Date')
  }

  const sortByTitle = () => {
    console.log('sortByTitle')
    setSortBy('Title')
  }

  return (
    <div className={classes.newsPaper}>
      {readBy === 'Country and Category' && !isCtryCatLaoding && (
        <>
          <div className={classes.searchBar}>
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
            <Button className={classes.searchBtn} variant="outlined">
              Search
            </Button>
          </div>
          <SortBtns sortByDate={() => sortByDate()} sortByTitle={() => sortByTitle()} />
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
          <div className={classes.searchBar}>
            <Selector
              name="Publisher"
              options={news.publishers}
              selected={selectedPubl}
              changeHandler={changePubl}
            />
            <Button className={classes.searchBtn} variant="outlined">
              Search
            </Button>
          </div>
          <SortBtns sortByDate={() => sortByDate()} sortByTitle={() => sortByTitle()} />
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
      {(isCtryCatLaoding || isPublLaoding) && <Loader />}
    </div>
  )
}

// 當捲軸到底部時，如果 total Result 大於目前 NewsList 長度
// fetch 下一頁，然後要 Loading 圖，然後把下一頁加到 NewsList 裡
// 排序功能

NewsPaper.propTypes = {
  readBy: PropTypes.string.isRequired,
}

export default NewsPaper
