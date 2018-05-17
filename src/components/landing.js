import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Search from './search';
import Logo from './logo';
import ResetGeolocationInst from './reset-geolocation-inst';


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
    }

    render(){
        
        let notValidMessage = '';
        if(this.props.match.path === '/notValid'){
            notValidMessage = <h3 className='notValid'>No location found. Please refine your search.</h3>
        }

        return (
            <div className="mainPage">
                <Logo logoClass="wholeLogoContainer"/>                

                <div className="searchContainer">
                    {notValidMessage}
                    <Search {...this.props} />     
                    <p>Enter a location to search for nearby trails or click <i className="fas fa-search"></i> to use current location</p>                   
                </div>

                <ResetGeolocationInst/>        
            </div>
        )
    };
}

export default Landing;