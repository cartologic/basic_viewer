import { combineReducers } from 'redux';
import { appInstance } from './appInstance';
import { config } from './config';


export default combineReducers({
    appInstance,
    config
})