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

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(1, 0, 2),
    width: '100%',
    maxWidth: 320,
  },
}))

const NewsCard = ({ imgUrl, newsTitle, newsSummary, publishedAt, sourceName }) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={imgUrl || 'https://source.unsplash.com/random/300x400'}
          title={newsTitle}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {newsTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {newsSummary}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {publishedAt}
        </Button>
        <Button size="small" color="primary">
          {sourceName}
        </Button>
      </CardActions>
    </Card>
  )
}

NewsCard.defaultProps = {
  imgUrl: 'https://source.unsplash.com/random/300x400',
  newsTitle: 'I am a news title',
  newsSummary: 'I am a news summary',
  publishedAt: '0000/00/00 00:00',
  sourceName: 'jujuriri',
}

NewsCard.propTypes = {
  imgUrl: PropTypes.string,
  newsTitle: PropTypes.string,
  newsSummary: PropTypes.string,
  publishedAt: PropTypes.string,
  sourceName: PropTypes.string,
}

export default NewsCard
