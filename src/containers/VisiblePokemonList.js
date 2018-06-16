import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as pokemonActions from '../actions/pokemon'
import PokemonList from '../components/PokemonList'

const mapStateToProps = (state, props) => {
  return {
    ...state.pokemons
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(pokemonActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList)
