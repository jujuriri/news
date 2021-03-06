import React, { useContext, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  makeStyles,
  Button,
  Divider,
  Dialog,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
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
  dialogHeader: {
    display: 'flex',
    padding: theme.spacing(2, 3),
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > div': {
      marginRight: theme.spacing(1),
    },
  },
  dialogImg: {
    display: 'block',
    width: '100%',
    height: 'auto',
    objectFit: 'scale-down',
    marginBottom: theme.spacing(1.5),
  },
  dialogFooter: {
    flexFlow: 'column',
    '& > p': {
      marginBottom: theme.spacing(1),
    },
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
  const [isLoading, setIsLoading] = useState(true)
  const [newsList, setNewsList] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [curPage, setCurPage] = useState(1)
  const [curClickedNews, setCurClickedNews] = useState({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCtryReady, setIsCtryReady] = useState(false)
  const [isCatReady, setIsCatReady] = useState(false)
  const [isPublReady, setIsPublReady] = useState(false)

  const prevSelectedCtry = usePrevious(selectedCtry)
  const prevSelectedCat = usePrevious(selectedCat)
  const prevSelectedPubl = usePrevious(selectedPubl)
  const prevCurPage = usePrevious(curPage)

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
      }
      setIsLoading(false)
      setIsAdminSetting(false)
    },
    [curPage, news.countries, news.publishers, newsList]
  )

  useEffect(() => {
    if (isAdminSetting) {
      // If user open Country and Category page
      if (readBy === 'Country and Category') {
        // Wait for <Selector /> options & firestore ready
        if (isCtryReady && isCatReady && firestore.adminCC.ctry && firestore.adminCC.cat) {
          setSelectedCtry(firestore.adminCC.ctry)
          setSelectedCat(firestore.adminCC.cat)
        }
        // Fetch news data
        if (prevSelectedCtry !== selectedCtry && prevSelectedCat !== selectedCat) {
          getNews(selectedCtry, selectedCat)
        }
      }
      // If users open Publisher page
      if (readBy === 'Publisher') {
        // Wait for <Selector /> options & firestore ready
        if (isPublReady && firestore.adminPubl !== '') {
          setSelectedPubl(firestore.adminPubl)
        }
        // Fetch news data
        if (prevSelectedPubl !== selectedPubl) {
          getNews(null, null, selectedPubl)
        }
      }
    }
  }, [
    firestore.adminCC.cat,
    firestore.adminCC.ctry,
    firestore.adminPubl,
    getNews,
    isAdminSetting,
    isCatReady,
    isCtryReady,
    isPublReady,
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
      if (window.innerHeight + window.scrollY >= trigger && !isLoading) {
        if (totalResults > newsList.length) {
          setCurPage(curPage + 1)
        } else {
          // No more page.
          return 0
        }
      }
      // Arrow function has to return something at the end
      return 0
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
    isLoading,
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
    if (windowWidth > 1280) {
      setColNum(4)
    } else if (windowWidth > 960) {
      setColNum(3)
    } else if (windowWidth > 600) {
      setColNum(2)
    } else {
      setColNum(1)
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
      if ((selectedCat !== '' && selectedCtry !== '') || selectedPubl !== '') {
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
          // Selected Options remaine the same as before, no need to search again.
          return 0
        }
      } else {
        // Required field is left empty.
        return 0
      }
    }
    // Arrow function has to return something at the end
    return 0
  }

  const openDialog = (title, img, content, time, source, author, url) => {
    const fully = {
      title,
      img,
      content,
      time,
      source,
      author,
      url,
    }
    setIsDialogOpen(true)
    setCurClickedNews(fully)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const openArticleUrl = url => {
    window.open(url, '_blank')
  }

  // Because I don't want to install short-id here, so I came up with this solution myself.
  let newsCardKey = 0

  const handleCtryReady = bool => {
    setIsCtryReady(bool)
  }

  const handleCatReady = bool => {
    setIsCatReady(bool)
  }

  const handlePublReady = bool => {
    setIsPublReady(bool)
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
              hasReady={handleCtryReady}
            />
            <Selector
              name="Category"
              options={news.categories}
              selected={selectedCat}
              changeHandler={changeCat}
              hasReady={handleCatReady}
            />
          </>
        )}
        {readBy === 'Publisher' && (
          <Selector
            name="Publisher"
            options={news.publishers}
            selected={selectedPubl}
            changeHandler={changePubl}
            hasReady={handlePublReady}
          />
        )}
        <Button className={classes.searchBtn} variant="outlined" onClick={() => userSearch()}>
          Search
        </Button>
      </div>
      <Divider className={classes.divider} />
      {newsList.length > 0 && (
        <>
          <Masonry colNum={colNum}>
            {newsList.map(n => {
              newsCardKey += 1
              return (
                <NewsCard
                  key={`NewsCard-${newsCardKey}`}
                  imgUrl={n.urlToImage}
                  articleUrl={n.url}
                  newsTitle={n.title}
                  newsSummary={n.description}
                  publishedAt={n.publishedAt}
                  sourceName={n.source.name}
                  author={n.author}
                  newsContent={n.content}
                  openDialog={openDialog}
                  openArticleUrl={openArticleUrl}
                />
              )
            })}
          </Masonry>
          <Dialog open={isDialogOpen} onClose={closeDialog}>
            <div className={classes.dialogHeader}>
              <div>
                <Typography variant="subtitle1">{curClickedNews.title}</Typography>
                <Typography variant="subtitle2" color="primary">
                  {curClickedNews.author}
                </Typography>
              </div>
              <IconButton onClick={() => closeDialog()}>
                <CloseIcon />
              </IconButton>
            </div>
            <DialogContent dividers>
              <img
                alt={curClickedNews.img}
                src={curClickedNews.img}
                className={classes.dialogImg}
              />
              <DialogContentText id="dialog-news-desc">{curClickedNews.content}</DialogContentText>
            </DialogContent>
            <DialogActions className={classes.dialogFooter}>
              <Typography variant="caption" color="primary" component="p">
                {curClickedNews.time}
              </Typography>
              <Button
                size="small"
                color="primary"
                onClick={() => openArticleUrl(curClickedNews.url)}
              >
                {curClickedNews.source}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      {!isLoading && newsList.length <= 0 && (
        <Typography variant="h5" color="primary" align="center">
          No news was found for your search.
        </Typography>
      )}
      {isLoading && <Loader />}
    </div>
  )
}

NewsPaper.propTypes = {
  readBy: PropTypes.string.isRequired,
}

export default NewsPaper
