import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDirections} from '../actions';
import keys from '../assets/config/apiKeys';


class PlanTrip extends Component {
	constructor(props){
		super(props);
		this.state = {
			location: [],
			routes: []
		};
	}
    componentDidMount(){  
        if (typeof google !== 'object'){
            // Connect the initMap() function within this class to the global window context,
            // so Google Maps can invoke it
            window.initMap = this.initDirection.bind(this);
            // Asynchronously load the Google Maps script, passing in the callback reference
            this.loadJS(keys.google); 
        }else{
            this.props.getDirections(this.props.match.params.lat, this.props.match.params.long, this.props.initLat, this.props.initLong);
        }
    }
    
    initDirection() {
        this.props.getDirections(this.props.match.params.lat, this.props.match.params.long, this.props.initLat, this.props.initLong); 
    }
    
    loadJS(src) {
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }

    render(){
        return (
            <div className="mainContent">                    
                <div className="mapContainer"> 
                    <div id='mapDirection' className='googleMap'></div>               
                </div>
                <div className="trailContainer">
                    <h1> latitude: {this.props.match.params.lat}</h1>
	                <h1> longitude: {this.props.match.params.long}</h1>
	                <p>{this.state.routes}</p>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
	return {
		routes: state.map.routes,
		initLat: state.map.lat,
		initLong: state.map.long
	}

}

export default connect(mapStateToProps, {getDirections})(PlanTrip);