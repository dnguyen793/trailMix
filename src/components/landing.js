import React from 'react';
import hiker from '../assets/images/logo/hiker.gif';
import earth from '../assets/images/logo/earth.png';
import {Link} from 'react-router-dom';

export default () => (
    <div className="mainPage">
        <div className="wholeLogoContainer">
            <div className="logo">
                <div className="earthContainer">
                    <div className="hikerContainer">
                        <img className="hiker" src={hiker}/>
                    </div>
                    <img className="earth" src={earth}/>
                </div>
            </div>
            <div className="titleContainer">
                trailMix
            </div>
        </div>

        <div className="searchContainer">
    		<div className="input-group">
                <input id='searchInput' className="form-control input-lg searchInput" type="text" placeholder="Current location"/>

                <div className="input-group-btn">
                    <Link to="/trailList">Find</Link>
                </div>
            </div>
            <p className="tips">Pick your location to look for nearby trails!</p>
        </div>        
    </div>
);