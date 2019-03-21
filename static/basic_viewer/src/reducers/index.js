import { combineReducers } from 'redux'

import {
    appErrors,
} from './errors'

import {
    appSettings,
} from './app'

import {
    map,
} from './map'

export default combineReducers( {
    map,
    appSettings,
    appErrors,
} )
