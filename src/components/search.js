import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateState} from '../actions';

class Search extends Component{

    constructor(props){
        super(props);

        this.state = {
            location: '',
            lat: '',
            long: ''
        };
    }

    componentDidMount(){
        this.geolocation();

    }

    geolocation(){
        this.watchId = navigator.geolocation.watchPosition((position) => {
            this.setState({
                lat: position.coords.latitude,
                long: position.coords.longitude
            });
            this.props.updateState(this.state.lat, this.state.long);
        },
        (error)=> this.setState({error: error.message}),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter:10 },
        );
    }

    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchId);
    }

    handleLocationChange(event){
        const newLocation = event.target.value;

        this.setState({
            location: newLocation
        });
        console.log('search state:', this.state);

    }

    handleEnterKey(e,queryStr){ //queryStr not needed?
        if (e.keyCode == 13) {
            this.props.history.push(`/trailList/`);

            // this.props.history.push(`/trailList/${this.state.location}`);
        }
    }

    render(){
        
        return (  
            <div className=''>
                <input className='form-control searchInput' onKeyUp={this.handleEnterKey.bind(this)} id='searchInput' onChange={this.handleLocationChange.bind(this)} value={this.state.location} type="text" placeholder="Current location"/>     
                <div className="input-group-btn">
                    <Link to={`/trailList/`}>

                    {/* <Link to={`/trailList/${this.state.location}`}> */}
                        <button className="startBtn">
                            <i className="fas fa-search"></i>
                        </button>
                    </Link>
                </div>
            </div>          
        );
    }
};

// export default Search;
function mapStateToProps(state){
    return{
        lat: state.map.lat,
        long: state.map.long
    }
}

export default connect(mapStateToProps, {updateState})(Search);