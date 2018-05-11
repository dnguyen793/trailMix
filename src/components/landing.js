import React, {Component} from 'react';
import hiker from '../assets/images/logo/hiker.gif';
import earth from '../assets/images/logo/earth.png';
import {Link} from 'react-router-dom';

class Landing extends Component{

    constructor(props){
        super(props);

        this.state = {
            location: ''
        }
    }

    handleLocationChange(event){
        const newLocation = event.target.value;

        this.setState({
            location: newLocation
        });
    }

    render(){
        
        return (
            <div className="mainPage">
                <div className="wholeLogoContainer">
                    <div className="logo">
                        <div className="earthContainer">
                            <div className="hikerContainer">
                                <img className="hiker" src={hiker}/>
                            </div>
                            <img className="earth" src={earth}/>
                        </div>
                    </div>
                    <div className="titleContainer">
                        trailMix
                    </div>
                </div>

                <div className="searchContainer">
                    <div className="input-group">
                        <input id='searchInput' onChange={this.handleLocationChange.bind(this)} value={this.state.location} className="form-control input-lg searchInput" type="text" placeholder="Enter a location to look for nearby trails!"/>

                        <div className="input-group-btn">
                            <Link to={`/trailList/${this.state.location}`}>
                                <button className="startBtn">
                                    <i className="fas fa-search"></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                    {/* <p className="tips"></p> */}
                </div>        
            </div>
        );
    }
};

export default Landing;