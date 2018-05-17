import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDirections} from '../actions';
import keys from '../assets/config/apiKeys';


class DrivingDirections extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			location: [],
            initLat: 0, //Remove the constructor?
            initLong: 0
		};
	}

    componentDidMount(){  
        if(Object.keys(this.props.map).length > 0){
            this.props.getDirections(this.props.traillat, 
                this.props.traillong, this.props.initLat, this.props.initLong, this.props.map);
        }
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
        map: state.map.mapDirections,
		initLat: state.map.lat,
		initLong: state.map.long
	}
}

export default connect(mapStateToProps, {getDirections})(DrivingDirections);