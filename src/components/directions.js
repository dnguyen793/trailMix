import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDirections} from '../actions';
import keys from '../assets/config/apiKeys';


class DrivingDirections extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			location: [],
            initLat: 0,
            initLong: 0
		};
	}

    componentDidMount(){  
        // if (typeof google !== 'object'){
        //     console.log("google doesn't exist");

        //     // Connect the initMap() function within this class to the global window context,
        //     // so Google Maps can invoke it
        //     window.initMap = this.initDirection.bind(this);
        //     // Asynchronously load the Google Maps script, passing in the callback reference
        //     this.loadJS(keys.google); 
        // }else{
        //     console.log('google exists.Else entered');
        if(Object.keys(this.props.map).length > 0){
            this.props.getDirections(this.props.traillat, 
                this.props.traillong, this.props.initLat, this.props.initLong,this.props.map);
        }
    }
    
    // initDirection() {
    //     this.props.getDirections(this.props.traillat, 
    //         this.props.traillong, this.props.initLat, this.props.initLong,this.props.map);
    // }
    
    loadJS(src) {
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }

    render(){

        console.log('Directions props: ', this.props);

        return (
            <div id="drivingDirectionContainer">
            </div> 
        );
    }
}

function mapStateToProps(state) {
	return {
        map: state.map.mapDirections,
		routes: state.map.routes, //Sadly, don't really need this anymore
		initLat: state.map.lat,
		initLong: state.map.long
	}
}

export default connect(mapStateToProps, {getDirections})(DrivingDirections);