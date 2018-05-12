import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getDirections} from '../actions';
import keys from '../assets/config/apiKeys';
import Search from './search';
import Logo from './logo';
import TrailLinks from './trail-links';
import Weather from './weather';



class PlanTrip extends Component {
	
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
            this.props.getDirections(this.props.match.params.lat, 
                this.props.match.params.long, this.props.initLat, this.props.initLong);
            // this.setState({
            //     initLat: this.props.initLat,
            //     initLong: this.props.initLong
            // }); 
        }
    }
    
    initDirection() {
        this.props.getDirections(this.props.match.params.lat, 
            this.props.match.params.long, this.props.initLat, this.props.initLong);
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
            <div className="plantrip">
                <Logo logoClass="wholeLogoContainerLite"/>                                       
                <Search {...this.props} />  
                <div className="mainContent">                    
                    <div className="mapContainer"> 
                        <div id='mapDirection' className='googleMap'></div>               
                    </div>
                    <div id="drivingDirectionContainer">
                        <div>
                            <TrailLinks/>

                            <Route path="/planTrip/:lat/lat/:long/long/weather" component={Weather} />
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, {getDirections})(PlanTrip);