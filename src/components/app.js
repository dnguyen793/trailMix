import React from 'react';
import './app.css';
import Landing from './landing';
import TrailList from './trailList';
import {Route} from 'react-router-dom';
import Weather from './weather';

const App = () => (    
    <div className='container'>        
        {/* <Route exact path="/" component={Landing} /> */}
        <Route path="/trailList" component={TrailList} />
        <Weather/>
    </div>    
);

export default App;
//commented out to test weather section.