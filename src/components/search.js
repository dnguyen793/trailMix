import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Search extends Component{

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
            <input className={`form-control input-lg ${this.props.searchClass}`} id='searchInput' onChange={this.handleLocationChange.bind(this)} value={this.state.location} type="text" placeholder="Current location"/>     
        );
    }
};

export default Search;