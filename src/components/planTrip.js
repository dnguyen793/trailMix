import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDirections} from '../actions';
import keys from '../assets/config/apiKeys';


class PlanTrip extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			location: [],
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
    	let distanceText = '';
    	let durationText = '';
    	let instructionList = [];
    	if (Object.keys(this.props.routes).length !== 0 && this.props.routes.constructor === Object){
    		console.log("Routes:", this.props.routes);
    		const {steps, distance, duration} = this.props.routes;
    		distanceText = distance.text;
    		durationText = duration.text;
    		instructionList = steps.map((item, index)=>{
	    		return(
	    			<li key ={index}>{item.instructions}</li>
	    		); 
    		});
    	}
 
        return (
            <div className="mainContent">                    
                <div className="mapContainer"> 
                    <div id='mapDirection' className='googleMap'></div>               
                </div>
                <div className="drivingDirectionContainer">
                	<div className="distance">{distanceText}</div>
                	<div className="duration">{durationText}</div>
                	<ul className="drivingSteps"> 
                		{instructionList}
                	</ul>
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