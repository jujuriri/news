import React, { useContext, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { makeStyles, Button, Divider } from '@material-ui/core'
import { usePrevious, useWindowWidth } from '../customHooks'
import { NewsContext, FirestoreContext } from '../context/context'
import Selector from './Selector'
import Masonry from './Masonry'
import NewsCard from './NewsCard'
import SortBtns from './SortBtns'
import Loader from './Loader'

const useStyles = makeStyles(theme => ({
  newsPaper: {
    margin: theme.spacing(0, 1, 7, 1),
    padding: theme.spacing(0, 1),
  },
  searchBar: {
    width: '100%',
    height: 88,
    display: 'flex',
  },
  searchBtn: {
    height: '64%',
    margin: theme.spacing(1),
    textTransform: 'none',
  },
  divider: {
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
  const [isLaoding, setIsLoading] = useState(true)
  const [newsList, setNewsList] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [curPage, setCurPage] = useState(1)
  const [sortBy, setSortBy] = useState('Date')

  const prevSelectedCtry = usePrevious(selectedCtry)
  const prevSelectedCat = usePrevious(selectedCat)
  const prevSelectedPubl = usePrevious(selectedPubl)
  const prevCurPage = usePrevious(curPage)
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

  // Function for fetching news
  const getNews = useCallback(
    async (ctry = null, cat = null, publ = null, pageNum = null) => {
      // Find out country code
      const ctryCode = Array.from(news.countries)
        .filter(country => country.name === ctry)
        .map(selected => selected.code)
      // Find out publisher ID
      const sourceId = Array.from(news.publishers)
        .filter(publisher => publisher.name === publ)
        .map(selected => selected.id)
      // AJAX
      const res = await axios(
        `https://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`,
        {
          params: {
            country: ctryCode,
            category: cat,
            sources: sourceId,
            page: pageNum,
          },
        }
      )
      if (res.data.articles.length > 0) {
        if (curPage > 1) {
          const moreNews = [...newsList].concat(res.data.articles)
          setNewsList(moreNews)
        } else {
          setNewsList(res.data.articles)
        }
        setTotalResults(res.data.totalResults)
        setIsLoading(false)
        setIsAdminSetting(false)
      } else {
        throw new Error('No Articles.')
      }
    },
    [curPage, news.countries, news.publishers, newsList]
  )

  useEffect(() => {
    // If user open Country and Category page
    if (readBy === 'Country and Category') {
      if (isAdminSetting && prevSelectedCtry !== selectedCtry && prevSelectedCat !== selectedCat) {
        getNews(selectedCtry, selectedCat)
      }
      if (prevSortBy !== sortBy) {
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
          const unSortNews = [...newsList]
          const sortedNews = unSortNews.sort((a, b) => {
            return a.title.localeCompare(b.title, `${lang}`)
          })
          setNewsList(sortedNews)
        }
      }
    }
    // If users open Publisher page
    if (readBy === 'Publisher') {
      if (isAdminSetting && prevSelectedPubl !== selectedPubl) {
        getNews(null, null, selectedPubl)
      }
      if (prevSortBy !== sortBy) {
        if (sortBy === 'Date') {
          console.log('出版商日期換換換')
        } else if (sortBy === 'Title') {
          console.log('出版商標題換換換')
          const unSortNews = [...newsList]
          const sortedNews = unSortNews.sort((a, b) => {
            return a.title.localeCompare(b.title)
          })
          setNewsList(sortedNews)
        }
      }
    }
  }, [
    getNews,
    isAdminSetting,
    news.countries,
    news.publishers,
    newsList,
    prevSelectedCat,
    prevSelectedCtry,
    prevSelectedPubl,
    prevSortBy,
    readBy,
    selectedCat,
    selectedCtry,
    selectedPubl,
    sortBy,
  ])

  // Infinite Scroll (Pagination)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY === document.body.offsetHeight && !isLaoding) {
        if (totalResults > newsList.length) {
          setCurPage(curPage + 1)
        } else {
          console.log('No more page.')
        }
      }
    }
    window.addEventListener('scroll', handleScroll)

    if (prevCurPage !== curPage) {
      setIsLoading(true)
      if (readBy === 'Country and Category') {
        getNews(selectedCtry, selectedCat, null, curPage)
      } else if (readBy === 'Publisher') {
        getNews(null, null, selectedPubl, curPage)
      }
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [
    curPage,
    getNews,
    isLaoding,
    newsList.length,
    prevCurPage,
    readBy,
    selectedCat,
    selectedCtry,
    selectedPubl,
    totalResults,
  ])

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
    setSortBy('Date')
  }

  const sortByTitle = () => {
    setSortBy('Title')
  }

  return (
    <div className={classes.newsPaper}>
      {newsList.length > 0 && (
        <>
          <div className={classes.searchBar}>
            {readBy === 'Country and Category' && (
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
              </>
            )}
            {readBy === 'Publisher' && (
              <Selector
                name="Publisher"
                options={news.publishers}
                selected={selectedPubl}
                changeHandler={changePubl}
              />
            )}
            <Button className={classes.searchBtn} variant="outlined">
              Search
            </Button>
          </div>
          <Divider className={classes.divider} />
          <SortBtns sortByDate={() => sortByDate()} sortByTitle={() => sortByTitle()} />
          <Masonry colNum={colNum}>
            {newsList.map((n, i) => {
              return (
                <NewsCard
                  key={`NewsCard-${i}`}
                  imgUrl={n.urlToImage}
                  articleUrl={n.url}
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
      {isLaoding && <Loader />}
    </div>
  )
}

NewsPaper.propTypes = {
  readBy: PropTypes.string.isRequired,
}

export default NewsPaper
