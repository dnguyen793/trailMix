import React, {Component} from 'react';
import './app.css';
import Landing from './landing';
import TrailList from './trailList';
import PlanTrip from './planTrip';
import {Route} from 'react-router-dom';


class App extends Component {

    render(){
        return (    
            <div className='container'>        
                <Route exact path="/" component={Landing} />
                <Route path='/trailList/:location/location' component={TrailList} />
                <Route exact path='/trailList//location' component={TrailList} />
                <Route path="/planTrip/:lat/lat/:long/long" component={PlanTrip} />

            </div>    
        );
    }
} 

export default App;