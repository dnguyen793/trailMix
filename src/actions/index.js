import types from './types';

let styles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9b2a6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dcd2be"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ae9e90"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817c"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a5b076"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fdfcf8"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8c967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#e9bc62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e98d58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#db8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806b63"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8f7d77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998d"
        }
      ]
    }
  ];

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
        let initLat, initLng;
        try {
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': location}, function(results, status) {
                    if (status == 'OK') {
                        initLat = results[0].geometry.location.lat();
                        initLng = results[0].geometry.location.lng();
                    } else {
                        console.log('Location lat and lng not available from getDirections.'); 
                    }
                });
            }catch(err){
            console.log('Geocoder Error:', err.message);
        }
            console.log('New initLat:', initLat);

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

            await directionsService.route(requestOptions, function(response, status) {
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
        } catch(err){
            console.log('Google Map for direction not working:', err);
        }
    }
}

export function deleteMapDirection(){
    return {
        type: types.DELETE_MAP_DIRECTIONS,
        payload: {map:{}}      
    }
}

