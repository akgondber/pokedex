import Lockr from 'lockr'
import axios from 'axios'

import {
  FILTER_POKEMONS,
  FETCH_POKEMONS_SUCCESS,
  POKEMONS_FETCHING,
  FETCH_POKEMONS_FAILED
} from '../constants'

export const filterPokemons = query => {
  return {
    type: FILTER_POKEMONS,
    query
  }
}

const fetchSprites = (results) => {
  return Promise.all(results.map(el => {
    return axios.get(el.url)
  }))
}

export const fetchPokemons = () => {
  return dispatch => {
    dispatch({
      type: POKEMONS_FETCHING
    })
    let pokemonsFromStorage = Lockr.get('pokemons')

    if (pokemonsFromStorage === undefined) {
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=30')
        .then(resp => {
          const results = resp.data.results

          fetchSprites(results)
            .then(spritesResp => {
              const fetchedPokemons = spritesResp.map(el => el.data)
              Lockr.set('pokemons', fetchedPokemons)

              dispatch({
                type: FETCH_POKEMONS_SUCCESS,
                payload: fetchedPokemons
              })
            }).catch(err => { // eslint-disable-line handle-callback-err
              dispatch({
                type: FETCH_POKEMONS_FAILED
              })
            })
        })
        .catch(err => {
          console.log('e2', err)
          dispatch({
            type: FETCH_POKEMONS_FAILED
          })
        })
    } else {
      dispatch({
        type: FETCH_POKEMONS_SUCCESS,
        payload: pokemonsFromStorage
      })
    }
  }
}

export const goToNextPage = (page) => {
  return {
    type: 'GO_TO',
    page
  }
}

export const goToPreviousPage = () => {
  return {
    type: 'GO_TO_PREVIOUS'
  }
}

export const goToNext = () => {
  return {
    type: 'GO_TO_NEXT'
  }
}
