import React, {Component} from 'react';
import hiker from '../assets/images/logo/hiker.gif';
import earth from '../assets/images/logo/earth.png';
import {Link} from 'react-router-dom';
import Search from './search';

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
                        <Search {...this.props} />                        
                    </div>
                    <p className="tips">Pick your location to look for nearby trails!</p>
                </div>        
            </div>
        );
    }
};

export default Landing;