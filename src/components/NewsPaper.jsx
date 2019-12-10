import React, { useContext, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { makeStyles, Button, Divider } from '@material-ui/core'
import { usePrevious, useWindowWidth } from '../customHooks'
import { NewsContext, FirestoreContext } from '../context/context'
import Selector from './Selector'
import Masonry from './Masonry'
import NewsCard from './NewsCard'
import Loader from './Loader'

const useStyles = makeStyles(theme => ({
  newsPaper: {
    margin: theme.spacing(0, 1, 9, 1),
    padding: theme.spacing(0, 1),
    width: '100%',
    maxWidth: 1320,
    [theme.breakpoints.down('md')]: {
      maxWidth: 994,
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 667,
    },
    [theme.breakpoints.down(600)]: {
      maxWidth: 310,
    },
  },
  searchBar: {
    width: '100%',
    height: 88,
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      maxWidth: 994,
    },
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'column',
      alignItems: 'center',
      height: 'auto',
      maxWidth: 651,
      padding: theme.spacing(0, 1),
    },
    '& > div:nth-of-type(1)': {
      marginLeft: theme.spacing(1),
    },
    '& > div:nth-of-type(2)': {
      marginLeft: theme.spacing(1),
    },
  },
  searchBtn: {
    height: 55,
    margin: theme.spacing(1),
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  divider: {
    margin: theme.spacing(1, 1, 3, 1),
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

  const prevSelectedCtry = usePrevious(selectedCtry)
  const prevSelectedCat = usePrevious(selectedCat)
  const prevSelectedPubl = usePrevious(selectedPubl)
  const prevCurPage = usePrevious(curPage)

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
    }
    // If users open Publisher page
    if (readBy === 'Publisher') {
      if (isAdminSetting && prevSelectedPubl !== selectedPubl) {
        getNews(null, null, selectedPubl)
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
    readBy,
    selectedCat,
    selectedCtry,
    selectedPubl,
  ])

  // Infinite Scroll (Pagination)
  useEffect(() => {
    const handleScroll = () => {
      const trigger = document.body.offsetHeight - 5
      // console.log('inner+scrollY', window.innerHeight + window.scrollY)
      // console.log('trigger', trigger, 'body offSet', document.body.offsetHeight)
      if (window.innerHeight + window.scrollY >= trigger && !isLaoding) {
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

  const userSearch = () => {
    if (!isAdminSetting) {
      if (selectedCat !== '' && selectedCtry !== '' && selectedPubl !== '') {
        if (
          prevSelectedCtry !== selectedCtry ||
          prevSelectedCat !== selectedCat ||
          prevSelectedPubl !== selectedPubl
        ) {
          setIsLoading(true)
          setNewsList([])
          setCurPage(1)
          if (readBy === 'Country and Category') {
            getNews(selectedCtry, selectedCat)
          }
          if (readBy === 'Publisher') {
            getNews(null, null, selectedPubl)
          }
        } else {
          console.log('搜尋選項一樣，不需重新搜尋')
        }
      } else {
        console.log('選項都必填')
      }
    }
  }

  return (
    <div className={classes.newsPaper}>
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
        <Button className={classes.searchBtn} variant="outlined" onClick={() => userSearch()}>
          Search
        </Button>
      </div>
      <Divider className={classes.divider} />
      {newsList.length > 0 && (
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
      )}
      {isLaoding && <Loader />}
    </div>
  )
}

NewsPaper.propTypes = {
  readBy: PropTypes.string.isRequired,
}

export default NewsPaper
