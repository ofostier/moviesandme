import { createStore, combineReducers } from 'redux';
//import {Provider} from 'react-redux'
import toggleFavorite from './Reducers/favoriteReducer'
import toggleTag from "./Reducers/tagReducer"

const reducers = combineReducers({
    toggleTag: toggleTag,
    toggleFavorite: toggleFavorite
})

export default createStore(toggleFavorite)
