import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getDirections} from '../actions';
import keys from '../assets/config/apiKeys';
import Search from './search';
import Logo from './logo';
import { NavLink } from 'react-router-dom';
import Directions from './directions';
import Weather from './weather';
import Details from './details';



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
        }
    }
    
    initDirection() {
        this.props.getDirections(this.props.match.params.lat, 
            this.props.match.params.long, this.props.initLat, this.props.initLong);
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
                <div className="planTripSearch">
                    <Search {...this.props} />  
                </div>                                      
                <div className="mainContent">
                    <div className="mapContainer"> 
                        <div id='mapDirection' className='googleMap'></div>               
                    </div>
                    <div className="planTripOptions">
                        <div className="planTripTabs">
                            <NavLink activeClassName='active selected' className="tabLinks" to={`/planTrip/${this.props.match.params.lat}/lat/${this.props.match.params.long}/long/${this.props.match.params.id}/id/details`}>Trail Detail</NavLink>
                            <NavLink activeClassName='active selected' className="tabLinks" to={`/planTrip/${this.props.match.params.lat}/lat/${this.props.match.params.long}/long/${this.props.match.params.id}/id/directions`}>Directions</NavLink>
                            <NavLink activeClassName='active selected' className="tabLinks" to={`/planTrip/${this.props.match.params.lat}/lat/${this.props.match.params.long}/long/${this.props.match.params.id}/id/weather`}>Weather</NavLink>
                            <NavLink activeClassName='active selected' className="tabLinks" to={`/trailList/`}>Back To Trails</NavLink>
                        </div>                   
                        <div className="tabContent">
                            <Route path={`/planTrip/:lat/lat/:long/long/:id/id/details`} component={Details} />
                            <Route path={`/planTrip/${this.props.match.params.lat}/lat/${this.props.match.params.long}/long/:id/id/directions`} 
                                render={props => <Directions {...props} traillat={this.props.match.params.lat} traillong={this.props.match.params.long}/> }/>
                            <Route path={`/planTrip/:lat/lat/:long/long/:id/id/weather`} component={Weather} />
                        </div>
                    </div>    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        initLat: state.map.lat,
        initLong: state.map.long
    }
}

export default connect(mapStateToProps, {getDirections})(PlanTrip);