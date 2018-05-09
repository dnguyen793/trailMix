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
