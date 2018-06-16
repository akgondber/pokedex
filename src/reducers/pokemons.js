import {
  FILTER_POKEMONS,
  FETCH_POKEMONS_SUCCESS,
  FETCH_POKEMONS_FAILED,
  POKEMONS_FETCHING
} from '../constants'

const initialState = {
  isFetching: false,
  isFetched: false,
  fetchingFailed: false,
  pokemons: [],
  filteredPokemons: [],
  showingPokemons: [],
  page: 1,
  perPage: 12
}

const pokemons = (state = initialState, action) => {
  switch (action.type) {
    case POKEMONS_FETCHING: {
      return {
        ...state,
        isFetching: true
      }
    }
    case FILTER_POKEMONS: {
      const {perPage} = state
      let filteredPokemons
      if (action.query === '') {
        filteredPokemons = state.pokemons.slice(0)
      } else {
        filteredPokemons = state.pokemons.filter(pokemon => pokemon.name.includes(action.query))
      }

      return {
        ...state,
        filteredPokemons,
        page: 1,
        showingPokemons: filteredPokemons.slice(0, perPage)
      }
    }
    case FETCH_POKEMONS_SUCCESS: {
      const { page, perPage } = state

      return {
        ...state,
        isFetching: false,
        isFetched: true,
        totalPokemons: action.totalPokemons,
        pokemons: action.payload,
        filteredPokemons: action.payload,
        showingPokemons: action.payload.slice(page - 1, perPage)
      }
    }
    case FETCH_POKEMONS_FAILED: {
      return {
        ...state,
        isFetched: false,
        isFetching: false
      }
    }
    case 'GO_TO_PREVIOUS': {
      if (state.page === 1) {
        return state
      }
      const { page, perPage, filteredPokemons } = state
      let newPage = page - 1

      return {
        ...state,
        page: newPage,
        showingPokemons: filteredPokemons.slice((newPage - 1) * perPage, (newPage - 1) * perPage + perPage)
      }
    }
    case 'GO_TO_NEXT': {
      const { page, perPage, filteredPokemons } = state
      let newPage = page + 1
      if (filteredPokemons.length <= (newPage - 1) * perPage) {
        return state
      }

      return {
        ...state,
        page: newPage,
        showingPokemons: filteredPokemons.slice((newPage - 1) * perPage, (newPage - 1) * perPage + perPage)
      }
    }
    case 'GO_TO': {
      const { perPage, filteredPokemons } = state

      if ((action.page - 1) * perPage >= filteredPokemons.length) {
        return state
      }

      const newPage = action.page

      return {
        ...state,
        page: newPage,
        showingPokemons: filteredPokemons.slice((newPage - 1) * perPage, (newPage - 1) * perPage + perPage)
      }
    }
    default:
      return state
  }
}

export default pokemons
