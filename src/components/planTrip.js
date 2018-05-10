import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDirections} from '../actions';
import keys from '../assets/config/apiKeys';

class PlanTrip extends Component {
	constructor(props){
        super(props);

        this.state = {
            trails : [],
            location:''     
        };
    }
}

export default PlanTrip;