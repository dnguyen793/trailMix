import React, {Component} from 'react';
import axios from 'axios';
import keys from '../assets/config/apiKeys';

class Details extends Component {
    constructor(props) {
        super(props);


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
        }).catch(err => {
            console.log('error is: ', err);    
        });
    }

    render() {

        console.log('Details props: ', this.props);
        
        return (
            <div>
                suh brah
            </div>
        );
    }
}

export default Details;