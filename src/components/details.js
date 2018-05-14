import React, {Component} from 'react';
import axios from 'axios';
import keys from '../assets/config/apiKeys';
import earth from '../assets/images/logo/earth.png';

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trailInfo: {}
        }
    }

    componentDidMount() {
        const params = {
            key: keys.rei,
            ids: this.props.match.params.id
        };
        const url = 'https://www.hikingproject.com/data/get-trails-by-id';    
        //call the server to search with the conditions we have in the search    
        axios.get(url,{params}).then(resp=>{
            console.log('resp is: ', resp);
            this.setState({
                trailInfo: resp.data.trails[0]
            })            
        }).catch(err => {
            console.log('error is: ', err);    
        });
    }

    render() {

        console.log('Details props: ', this.props);
        
        const {trailInfo} = this.state;

        return (
            <div>
                {
                    this.state.trailInfo && 
                    <div>
                        <img src={trailInfo.imgSmallMed || earth} />
                        <div>{trailInfo.name}</div>
                        <div>{trailInfo.location}</div>
                        <div>{trailInfo.summary}</div>
                        <div>Length: {trailInfo.length} miles</div>
                        <div>Rating: {trailInfo.stars} based on {trailInfo.starVotes} votes</div>
                        <div>Elevation</div>
                        <div>Ascent: {trailInfo.ascent} feet</div>
                        <div>Descent: {trailInfo.descent} feet</div>
                        <div>Highest point: {trailInfo.high} feet</div>
                        <div>Lowest point: {trailInfo.low} feet</div>
                    </div>
                }
            </div>
        );
    }
}

export default Details;