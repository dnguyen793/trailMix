import React from 'react';
import './app.css';
import Landing from './landing';
import TrailList from './trailList';
import {Route} from 'react-router-dom';

const App = () => (    
    <div className='container'>        
        <Route exact path="/" component={Landing} />
        <Route path="/trailList" component={TrailList} />
    </div>    
);

export default App;
