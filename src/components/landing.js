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

    handleLocationChange(event){  //Need this function here?
        const newLocation = event.target.value;

        this.setState({
            location: newLocation
        });

    render(){
        
        return (
            <div className="mainPage">
                <Logo logoClass="wholeLogoContainer"/>                

                <div className="searchContainer">
                    <Search {...this.props} />     
                    <p>Enter a location to search for nearby trails or click <i className="fas fa-search"></i> to use current location</p>                   
                </div>        
            </div>
        );
    }
};

export default Landing;