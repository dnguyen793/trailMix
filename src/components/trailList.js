import React, {Component} from 'react';
import Trail from './trail';
import axios from 'axios';
import {connect} from 'react-redux';
import {getCoordinates} from '../actions';
import markerIcon2 from '../assets/images/markers/map_marker2.png';
import markerIcon1 from '../assets/images/markers/map_marker1.png';
import keys from '../assets/config/apiKeys';
import hiker from '../assets/images/logo/hiker.gif';
import earth from '../assets/images/logo/earth.png';


class TrailList extends Component {

    constructor(props){
        super(props);

        this.state = {
            trails : [],
            location:''     
        };
    }
    
    componentDidMount(){  
        // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.initMap = this.initMap.bind(this);
        // Asynchronously load the Google Maps script, passing in the callback reference
        this.loadJS(keys.google); 
    }
    
    initMap() {
        this.props.getCoordinates(this.props.match.params.location); 
    }
    
    loadJS(src) {
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }
    
    handleLocationChange(event){
        const newLocation = event.target.value;

        this.setState({
            location: newLocation
        });
    }

    componentWillReceiveProps(newProps){
        if(this.props.lat !== newProps.lat && this.props.long !== newProps.long){
            console.log('test');
            const params = {
                key: keys.rei,
                lat:newProps.lat,
                lon:newProps.long,
                maxDistance:30,
                maxResults:50,
                minStars:3
            };
            const url = 'https://www.hikingproject.com/data/get-trails';    
            //call the server to search with the conditions we have in the search    
            axios.get(url,{params}).then(resp=>{
                var domElementArray = [];
                const trailList = resp.data.trails.map((item,index)=>{
                    
                    //add the markers
                    var marker = this.addMarkerToEachTrail(item);
                    item['marker']=marker;
                    return item;
                });
    
                this.setState({
                    trails: trailList
                });
                
            }).catch(err => {
                console.log('error is: ', err);    
            });
        }        
    }

    /***************************************************************************************************
     * addMarkerToEachTrail - add marker to each trail
     * @params {object} The trail object from the data
     * @returns  {undefined}
     *
     */
    addMarkerToEachTrail(trailObj) {    
        var trailLat = trailObj.latitude;
        var trailLng = trailObj.longitude;

        var marker = new google.maps.Marker({
            position: {lat: trailLat, lng: trailLng},
            map: this.props.map,
            icon: {
                url: markerIcon2,
                scaledSize: new google.maps.Size(40,50)
            }
        });

        marker.addListener('mouseover', function() {
            this.setIcon({
                url: markerIcon1,
                scaledSize: new google.maps.Size(60,70)
            });

            var divToFocus = document.getElementById(trailObj.name);
            divToFocus.classList.add("trailDivFocus");
            divToFocus.scrollIntoView();
        });
     
        marker.addListener('mouseout', function() {
            this.setIcon({
                url: markerIcon2,
                scaledSize: new google.maps.Size(40,50)
            });
            
            var divToFocus = document.getElementById(trailObj.name);
            divToFocus.classList.remove("trailDivFocus");
        });
        
        return marker;
    }

    handleEnterKey(e,queryStr){
        if (e.keyCode == 13) {
            this.props.getCoordinates(this.state.location);
        }
    }
    
    render(){

        const list = this.state.trails.map((item,index)=>{
            return <Trail key={index} trail={item} />
        });

        return (
                <div>
                    <div className="wholeLogoContainerLite">
                        <div className="logo">
                            <div className="earthContainer">
                                <div className="hikerContainer">
                                    <img className="hiker" src={hiker}/>
                                </div>
                                <img className="earth" src={earth}/>
                            </div>
                        </div>
                        <div className="titleContainer">
                            trailMix
                        </div>
                    </div>
                    <input id='searchInput' onKeyUp={this.handleEnterKey.bind(this)} onChange={this.handleLocationChange.bind(this)} value={this.state.location} className="form-control searchInputLite" type="text" placeholder="Current location"/>
                    <div className="mainContent">                    
                        <div className="mapContainer"> 
                            <div id='map' className='googleMap'></div>               
                        </div>
                        <div className="trailContainer">
                            {list}
                        </div>
                    </div>
                </div>                
                );
    }
}

function mapStateToProps(state){
    return{
        map: state.map.map,
        lat: state.map.lat,
        long: state.map.long
    }
}

export default connect(mapStateToProps, {getCoordinates})(TrailList);