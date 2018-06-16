import React, { Component } from 'react'
import {
  ButtonBase,
  Input,
  IconButton,
  InputAdornment,
  Grid,
  Divider
} from '@material-ui/core'
import Pokemon from './Pokemon'
import Loader from './common/Loader'
import { Search, ArrowLeft, ArrowRight } from 'react-feather'

class PokemonList extends Component {
  componentDidMount () {
    this.props.fetchPokemons()
  }

  searchChange (e) {
    this.props.filterPokemons(e.target.value)
  }

  render () {
    const {isFetching, showingPokemons, filteredPokemons, page, perPage} = this.props
    const totalPages = Math.ceil(filteredPokemons.length / perPage)
    let hasPrevious = page > 1
    let hasNext = page * perPage < filteredPokemons.length

    return (
      <div style={{margin: '0 10px 30px', position: 'relative'}}>
        <Grid container>
          <Grid item style={{marginRight: 'auto'}}>
            <Input
              name='search'
              label='Search pokemons'
              placeholder='Enter search term'
              onChange={this.searchChange.bind(this)}
              startAdornment={<InputAdornment position='start'><Search /></InputAdornment>}
            />
          </Grid>

          <Grid item style={{marginRight: 'auto'}}>
            <IconButton disabled={!hasPrevious} onClick={this.handleGoToPrevious.bind(this)}><ArrowLeft size={24} /></IconButton>
            <IconButton disabled={!hasNext} onClick={this.handleGoToNext.bind(this)}><ArrowRight /></IconButton>
            <span>Page {page} of {totalPages}</span>
          </Grid>
          <Grid item>
            <span>Go to</span>
            <Input
              className='ml10'
              type='number'
              inputProps={{max: totalPages, min: 1, id: 'paget'}}
              inputRef={(el) => {
                this.newPageRef = el
              }}
              placeholder='Page'
              style={{width: 60, marginLeft: 12}}
            />
            <ButtonBase style={{marginLeft: 10, padding: 4, backgroundColor: '#e9cd90'}} onClick={this.handleGoToPage.bind(this)}>Go</ButtonBase>
          </Grid>
          <Divider />
        </Grid>
        <div>
          {
            isFetching
              ? <Loader />
              : <Grid container justify='center' wrap='wrap' spacing={16}>
                {showingPokemons.map((pokemon, i) =>
                  <Grid key={i} item md={3} lg={2} sm={6} xs={12}>
                    <Pokemon {...pokemon} />
                  </Grid>
                )}
              </Grid>
          }
        </div>
      </div>
    )
  }
  handleNextPageClick () {
    const {page} = this.props
    if (page < 4) {
      this.props.goToNextPage(page + 1)
    } else {
      this.props.goToNextPage(page - 1)
    }
  }

  handleGoToPrevious (e) {
    this.props.goToPreviousPage()
  }

  handleGoToNext (e) {
    this.props.goToNext()
  }

  handleGoToPage (e) {
    if (this.newPageRef.value < this.props.filteredPokemons.length) {
      this.props.goToNextPage(this.newPageRef.value)
    }
  }
}

export default PokemonList
