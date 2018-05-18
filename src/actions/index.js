import types from './types';
import styles from './mapStyles';


export function getCoordinates(location,props){
    
    return async dispatch => {

        let lat, long, map;
        if(location === 'current location'){
            await navigator.geolocation.getCurrentPosition(function(position) {
              lat = position.coords.latitude;
              long = position.coords.longitude;
              map = initMap(lat,long);
              dispatch({
                type: types.GET_COORDINATES,
                payload: {lat,long,map,location}
              })
            });
        }else{
          try {             
            var geocoder = new google.maps.Geocoder();
            await geocoder.geocode( { 'address': location}, function(results, status) {
                if (status == 'OK') {
                    lat = results[0].geometry.location.lat();
                    long = results[0].geometry.location.lng();
                    map = initMap(lat,long);
                    dispatch({
                      type: types.GET_COORDINATES,
                      payload: {lat,long,map,location}
                    })
                } else {
                    props.history.push('/notValid'); 
                }
            });
          }catch(err){
            console.log('Create Map Error:', err.message);
        }
      }
    }
}

function initMap(lat,long){

    let map;
    var options = {
        center: {lat: lat, lng: long},
        zoom: 10,
        styles: styles
    };
    let googleMap = document.getElementById('map');
    map = new google.maps.Map(googleMap, options);

    var marker = new google.maps.Marker({
        position: {lat: lat, lng: long},
        map: map                        
    });

    return map;
    
}

export function getDirections(trailLat, trailLng, map, location) {
    return async dispatch => {
        try {
            let initLat, initLng;
            if(location === 'current location'){
                await navigator.geolocation.getCurrentPosition(function(position) {
                    initLat = position.coords.latitude;
                    initLng = position.coords.longitude;                  
                    initMapDirections(initLat,initLng,trailLat, trailLng, map, dispatch);
                });
            }else{
                let geocoder = new google.maps.Geocoder();
                await geocoder.geocode( { 'address': location}, function(results, status) {
                    if (status == 'OK') {
                        initLat = results[0].geometry.location.lat();
                        initLng = results[0].geometry.location.lng();
                        initMapDirections(initLat,initLng,trailLat, trailLng, map, dispatch);
                    } else {
                        console.log('Location lat and lng not available from getDirections.'); 
                    }
                });
            }  
            
        } catch(err){
            console.log('Google Map for direction not working:', err);
        }
    }
 }

function initMapDirections(initLat,initLng,trailLat, trailLng, map, dispatch){
    if(Object.keys(map).length === 0){
        const options ={
            center: {lat: parseFloat(initLat), lng: parseFloat(initLng)},
            zoom: 10,
            styles: styles
        };
        let googleMap = document.getElementById('mapDirection');
        map = new google.maps.Map(googleMap, options);
    }
    
    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('drivingDirectionContainer'));
    
    const requestOptions = {
        origin: {lat: parseFloat(initLat), lng: parseFloat(initLng)},
        destination: {lat: parseFloat(trailLat), lng: parseFloat(trailLng)},
        travelMode: 'DRIVING'
    };

    directionsService.route(requestOptions, function(response, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
            dispatch({
                type: types.GET_DIRECTIONS,
                payload: {map}
            });
        } else {
            console.log('Google direction not working due to:', status);
        }
    }); 
}

export function deleteMapDirection(){
    return {
        type: types.DELETE_MAP_DIRECTIONS,
        payload: {map:{}}      
    }
}

