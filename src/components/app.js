import React, {Component} from 'react';
import './app.css';
import Landing from './landing';
import TrailList from './trailList';
import {Route} from 'react-router-dom';
import Weather from './weather';

class App extends Component {

    componentDidMount(){
         // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.initMap = this.initMap;
        // Asynchronously load the Google Maps script, passing in the callback reference
        this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDYScuf8sd1NNdQGFoeKVeXLEYNtYPIroU&libraries=places');
    }

    loadJS(src) {
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }

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