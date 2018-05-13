import React, {Component} from 'react';
// import {Route} from 'react-router-dom';
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
        if (typeof google !== 'object'){
            // Connect the initMap() function within this class to the global window context,
            // so Google Maps can invoke it
            window.initMap = this.initDirection.bind(this);
            // Asynchronously load the Google Maps script, passing in the callback reference
            this.loadJS(keys.google); 
        }else{
            console.log('Directions props:',this.props);
            this.props.getDirections(this.props.traillat, 
                this.props.traillong, this.props.initLat, this.props.initLong);
            // this.setState({
            //     initLat: this.props.initLat,
            //     initLong: this.props.initLong
            // }); 
        }
    }
    
    initDirection() {
        this.props.getDirections(this.props.traillat, 
            this.props.traillong, this.props.initLat, this.props.initLong);
        // this.setState({
        //     initLat: this.props.initLat,
        //     initLong: this.props.initLong
        // }); 
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
            <div id="drivingDirectionContainer">
            </div> 
        );
    }
}

function mapStateToProps(state) {
	return {
		routes: state.map.routes, //Don't really need this anymore
		initLat: state.map.lat,
		initLong: state.map.long
	}
}

export default connect(mapStateToProps, {getDirections})(DrivingDirections);