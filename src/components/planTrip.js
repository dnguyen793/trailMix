import React, {Component} from 'react';


class TrailList extends Component {

    render(){
        return (<div>
                   <h1> latitude: {this.props.match.params.lat}</h1>
                   <h1> longitude: {this.props.match.params.long}</h1>
                </div>
                );
    }
}

export default TrailList;