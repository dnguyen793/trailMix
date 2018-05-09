import React, {Component} from 'react';
import reiKey from '../assets/config/apiKeys';
import Trail from './trail';
import axios from 'axios';
import {connect} from 'react-redux';
import {getCoordinates} from '../actions';

class TrailList extends Component {

    constructor(props){
        super(props);

        this.state = {
            trails : []       
        };
    }

    componentDidMount(){        
        this.props.getCoordinates(this.props.match.params.location);        
    }

    componentWillReceiveProps(newProps){
        if(this.props.lat !== newProps.lat && this.props.long !== newProps.long){
            console.log('test');
            const params = {
                key: reiKey,
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
                url: "../assets/images/markers/map_marker2.png",
                scaledSize: new google.maps.Size(40,50)
            }
        });
        return marker;
    }

    render(){

        const list = this.state.trails.map((item,index)=>{
            return <Trail key={index} trail={item} />
        });

        const style = {
            height: '100%', 
            width: '100%'
        }
        return (<div className="mainContent container">
                    <div className="mapContainer"> 
                        <div id='map' style={style}></div>               
                    </div>
                    <div className="trailContainer">
                        {list}
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