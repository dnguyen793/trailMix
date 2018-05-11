import {combineReducers } from 'redux';
import mapReducer from './mapReducer';

export default combineReducers({ //put the returned obj into store's state
    map: mapReducer 
});