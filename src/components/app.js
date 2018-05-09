import React from 'react';
import './app.css';
import Landing from './landing';
import TrailList from './trailList';
import {Route} from 'react-router-dom';
import Weather from './weather';

const App = () => (    
    <div className='container'>        
        <Route exact path="/" component={Landing} />
        <Route path='/trailList' render={props => <TrailList lat={33.6866448} long={-117.8434286} {...props} />} />
    </div>    
);

export default App;
//commented out to test weather section.