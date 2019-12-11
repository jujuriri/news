import React from 'react'
import PropTypes from 'prop-types'
import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  Button,
} from '@material-ui/core'
import moment from 'moment-timezone'

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(1, 0, 2),
    width: '100%',
    maxWidth: 310,
  },
  cardActionsArea: {
    transition: 'background-color .2s linear',
  },
  cardActions: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'flex-end',
  },
  toLocalTime: {
    margin: theme.spacing(0, 0.5, 0.5, 0),
  },
}))

const NewsCard = ({
  imgUrl,
  newsTitle,
  newsSummary,
  publishedAt,
  sourceName,
  author,
  articleUrl,
  newsContent,
  openDialog,
}) => {
  const classes = useStyles()

  const checkedImgUrl = url => {
    if (url === null || url === 'null' || !url) {
      return 'https://source.unsplash.com/random/300x400'
    }
    return url
  }

  const checkedNewsContent = content => {
    if (content === null || content === 'null' || !content) {
      return newsSummary
    }
    return content
  }

  const toLocalTime = utc => {
    const publTime = moment(`${utc}`)
    const userTZ = moment.tz.guess(true)
    return publTime.tz(userTZ).format('LLL')
  }

  const checkedAuthor = name => {
    if (name === null || name === 'null' || !name) {
      return `No Author Information.`
    }
    return name
  }

  const openArticleUrl = url => {
    window.open(url, '_blank')
  }

  return (
    <Card className={classes.card}>
      <CardActionArea
        className={classes.cardActionsArea}
        onClick={() =>
          openDialog(
            newsTitle,
            checkedImgUrl(imgUrl),
            checkedNewsContent(newsContent),
            toLocalTime(publishedAt),
            sourceName,
            checkedAuthor(author)
          )
        }
      >
        <CardMedia component="img" height="140" image={checkedImgUrl(imgUrl)} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            {newsTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {newsSummary}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Typography className={classes.toLocalTime} variant="caption" color="primary" component="p">
          {toLocalTime(publishedAt)}
        </Typography>
        <Button size="small" color="primary" onClick={() => openArticleUrl(articleUrl)}>
          {sourceName}
        </Button>
      </CardActions>
    </Card>
  )
}

NewsCard.defaultProps = {
  imgUrl: 'https://source.unsplash.com/random/300x400',
  newsTitle: 'I am a news title',
  newsSummary: 'I am news summary',
  publishedAt: '0000/00/00 00:00',
  sourceName: 'google',
  author: 'I am author',
  articleUrl: 'https://google.com',
  newsContent: 'I am news content',
}

NewsCard.propTypes = {
  imgUrl: PropTypes.string,
  newsTitle: PropTypes.string,
  newsSummary: PropTypes.string,
  publishedAt: PropTypes.string,
  sourceName: PropTypes.string,
  author: PropTypes.string,
  articleUrl: PropTypes.string,
  newsContent: PropTypes.string,
  openDialog: PropTypes.func.isRequired,
}

export default NewsCard
