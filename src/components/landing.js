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
                        <input id='searchInput' onChange={this.handleLocationChange.bind(this)} value={this.state.location} className="form-control input-lg searchInput" type="text" placeholder="Enter a location to look for nearby trails!"/>

                        <div className="input-group-btn">
                            <Link to={`/trailList/${this.state.location}`}>
                                <button className="startBtn">
                                    <i className="fas fa-search"></i>
                                </button>
                            </Link>
                        </div>
                    </div>


                    <div className="input-group">                        
                        <Search {...this.props} />                        
                    </div>
                </div>        
            </div>
        );
    }
};

export default Landing;