import types from './types';

export function getCoordinates(location){
    
    return async dispatch => {
        try {             
            var geocoder = new google.maps.Geocoder();
            let map, lat, long;
            await geocoder.geocode( { 'address': location}, function(results, status) {
                if (status == 'OK') {
                    lat = results[0].geometry.location.lat();
                    long = results[0].geometry.location.lng();
                    var options = {
                        center: {lat: lat, lng: long},
                        zoom: 10
                    };
                    let googleMap = document.getElementById('map');
                    map = new google.maps.Map(googleMap, options);

                    dispatch({
                        type: types.GET_COORDINATES,
                        payload: {lat,long,map}
                    })
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
            
        }catch(err){
            console.log('Create Map Error:', err.message);
        }
    }
}

export function getDirection(trailLat, trailLong,initLat,initLng) {
    return async dispatch => {
        try {
            // const {latitude, longitude} = trailInfo;
            // let directionsService = new google.maps.DirectionsService();
            // let directionsDisplay = new google.maps.DirectionsRenderer();
            // let directionContainer = document.querySelector('.directionsContainerMargin');
            // directionContainer.innerHTML = '';
            // directionsDisplay.set('directions', null);
            // directionsDisplay.setMap(map);
            // directionsDisplay.setPanel(document.querySelector('directionsContainerMargin'));
            
            const requestOptions = {
                origin: {lat: initLat, lng: initLng},
                destination: {lat: trailLat, lng: trailLong},
                travelMode: 'DRIVING'
            };

            await directionsService.route(requestOptions, (response, status)=> {
                if (status == 'OK') {
                    directionsDisplay.setDirections(response);
                    dispatch({
                        type: types.GET_DIRECTIONS,
                        payload: response.routes[0].legs[0].steps
                    });
                } else {
                    console.log('Google direction not working due to:', status);
                }

            }); 
        } catch(err){
            console.log('Google Map for direction not working:', err);
        }
    }
}
