import React, {Component} from 'react';
import reiKey from '../assets/config/apiKeys';
import Trail from './trail';

class TrailList extends Component {

    constructor(props){
        super(props);

        this.state = {
            trails: []
        };
    }

    componentDidMount(){
        
        const params = {
            key: reiKey,
            lat:this.props.lat,
            lon:this.props.long,
            maxDistance:30,
            maxResults:50,
            minStars:3
        };
        const url = 'https://www.hikingproject.com/data/get-trails';    
        //call the server to search with the conditions we have in the search    
        axios.get(url,{params}).then(resp=>{
            var domElementArray = [];
            var trailContainer = $('.trailContainer');
            const trailList = resp.trails.map((item,index)=>{
                
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
            map: map,
            icon: {
                url: "assets/markers/map_marker2.png",
                scaledSize: new google.maps.Size(40,50)
            }
        });
        return marker;
    }

    render(){

        const list = this.state.trails.map((item,index)=>{
            <Trail key={index} trail={item} />
        });

        <div class="mainContent container">
            <div class="mapContainer">
                <div class="mapContainerMargin"></div>
            </div>
            <div class="trailContainer">
                {list}
            </div>
        </div>
    }
}

export default TrailList;