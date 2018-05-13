import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Search from './search';
import Logo from './logo';

import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";


class Landing extends Component{

    constructor(props){
        super(props);

        this.state = {
            location: '',
            lat: null,
            lng: null,
            error: null
        }
    }

    componentDidMount(){
        this.geolocation();
    }

    geolocation(){
        let lat = null;
        let lng = null; 
        this.watchId = navigator.geolocation.watchPosition((position) => {
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            console.log('lat: ', this.state.lat);
            console.log('long: ', this.state.lng);

        },
        (error)=> this.setState({error: error.message}),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter:10 },
        );
    }

    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchId);
    }

    handleLocationChange(event){  //Need this function here?
        const newLocation = event.target.value;

        this.setState({
            location: newLocation
        });
    }

    render(){
        
        return (
            <div className="mainPage">
                <Logo logoClass="wholeLogoContainer"/>                

                <div className="searchContainer">
                    <Search {...this.props} />     
                    <p>Enter a location to search for nearby trails or click <i className="fas fa-search"></i> to use current location</p>                   
                </div>        
            </div>
        );
    }
};

export default Landing;