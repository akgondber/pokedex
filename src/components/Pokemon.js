import React, { Fragment } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const style = {
  cardHeader: {
    textAlign: 'center'
  },
  card: {
    margin: '4px 10px',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-1%)',
      boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8)'
    }
  },
  chip: {
    backgroundColor: 'cyan',
    '&:nth-of-type(n+2)': {
      marginLeft: 6
    }
  }
}

const Pokemon = ({ onClick, classes, name, type, url, base_experience, sprites, types }) => ( // eslint-disable-line camelcase
  <Fragment>
    <Card className={classes.card} raised>
      <CardHeader className={classes.cardHeader} title={name} component='h4' />
      <div style={{textAlign: 'center'}}>
        <img src={sprites.front_shiny} alt={name} />
      </div>
      <CardContent>
        <Typography color='textSecondary'>Types</Typography>

        {types.map((type, i) =>
          <Chip className={classes.chip} key={i} label={type.type.name} />
        )}
      </CardContent>
    </Card>
  </Fragment>
)

export default withStyles(style)(Pokemon)
