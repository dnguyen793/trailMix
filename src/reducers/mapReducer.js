import types from '../actions/types';

const DEFAULT_STATE = {
    map:{},
    lat: 33.6348792,
    long: -117.7426695,
    routes: {}
};

export default function(state = DEFAULT_STATE, action){
    switch(action.type){        
        case types.GET_COORDINATES:
            return {...state, lat: action.payload.lat, long: action.payload.long, map:action.payload.map};        
        case types.GET_DIRECTIONS:
        	return {...state, routes: action.payload};
        default:
            return state;
    }
}