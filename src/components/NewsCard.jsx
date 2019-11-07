import React from 'react'
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
    margin: theme.spacing(1),
  },
}))

const NewsCard = () => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

export default NewsCard
