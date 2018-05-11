import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Search from './search';
import Logo from './logo';

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
                <Logo logoClass="wholeLogoContainer"/>                

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