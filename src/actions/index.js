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

                    var marker = new google.maps.Marker({
                        position: {lat: lat, lng: long},
                        map: map                        
                    });

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

export function getDirections(trailLat, trailLong, initLat, initLng) {
    return async dispatch => {
        try {
            const options ={
                center: {lat: initLat, lng: initLng},
                zoom: 10
            };
            let googleMap = document.getElementById('mapDirection');
            let map = new google.maps.Map(googleMap, options);
            let directionsService = new google.maps.DirectionsService();
            let directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.querySelector('mapDirection'));
            
            const requestOptions = {
                origin: {lat: initLat, lng: initLng},
                destination: {lat: parseFloat(trailLat), lng: parseFloat(trailLong)},
                travelMode: 'DRIVING'
            };

            await directionsService.route(requestOptions, function(response, status) {
                if (status == 'OK') {
                    directionsDisplay.setDirections(response);
                    dispatch({
                        type: types.GET_DIRECTIONS,
                        payload: response.routes[0].legs[0]
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
