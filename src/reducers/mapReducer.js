import types from '../actions/types';

const DEFAULT_STATE = {
    map:{},
    mapDirections:{}
};

export default function(state = DEFAULT_STATE, action){
    switch(action.type){        
        case types.GET_COORDINATES:
            return {...state, lat: action.payload.lat, long: action.payload.long, map:action.payload.map};
        case types.GET_DIRECTIONS:
            return {...state, mapDirections:action.payload.map};      
        case types.DELETE_MAP_DIRECTIONS:
            return {...state, mapDirections:action.payload.map};      
        default:
            return state;
    }
}