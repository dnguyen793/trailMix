import React, {Component} from 'react';
import './app.css';
import Landing from './landing';
import TrailList from './trailList';
import {Route} from 'react-router-dom';


class App extends Component {

    render(){
        return (    
            <div className='container'>        
                <Route exact path="/" component={Landing} />
                <Route path='/trailList/:location' render={props => <TrailList {...props} />} />

            </div>    
        );
    }
} 

export default App;