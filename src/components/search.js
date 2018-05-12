import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Search extends Component{

    constructor(props){
        super(props);

        this.handleAutocompInput = this.handleAutocompInput.bind(this);

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

    handleAutocompInput(input){
        this.setState({
            location: input
        });
        this.props.history.push(`/trailList/${this.state.location}`);
    }

    handleEnterKey(e,queryStr){ //queryStr not needed?

        if (e.keyCode == 13) {
            let inputField = document.getElementById('searchInput');
            let inputComplete = new google.maps.places.Autocomplete(inputField);
            google.maps.event.addListener(inputComplete, 'place_changed', () => {
                if (inputComplete.gm_accessors_.place.gd.formattedPrediction) {
                    this.handleAutocompInput(inputComplete.gm_accessors_.place.gd.formattedPrediction);
                } else {
                    this.props.history.push(`/trailList/${this.state.location}`);
                }
            });
            setTimeout( () => this.props.history.push(`/trailList/${this.state.location}`), 100);
            // this.props.history.push(`/trailList/${this.state.location}`)
        }
    }

    componentDidMount() {
        let inputField = document.getElementById('searchInput');
        let inputComplete = new google.maps.places.Autocomplete(inputField);
        google.maps.event.addListener(inputComplete, 'place_changed', () => {
            if (inputComplete.gm_accessors_.place.gd.formattedPrediction){
                this.handleAutocompInput(inputComplete.gm_accessors_.place.gd.formattedPrediction);
            }
        });
    }

    render(){
        return (  
            <div className='searchDiv'>
                <input className='form-control searchInput' onKeyUp={this.handleEnterKey.bind(this)} id='searchInput' onChange={this.handleLocationChange.bind(this)} value={this.state.location} type="text" placeholder="Current location"/>     
                <div className="input-group-btn">
                    <Link to={`/trailList/${this.state.location}`}>
                        <button className="startBtn">
                            <i className="fas fa-search"></i>
                        </button>
                    </Link>
                </div>
            </div>          
        );
    }
};

export default Search;