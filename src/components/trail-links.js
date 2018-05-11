import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/trail-links.css';

export default props => (
    <div className="tabsContainer">
        <ul className="nav nav-tabs">
            <li className="nav-item tabStyle">
                <NavLink to="/trailList/:location/direction" activeClassName="active selected" className="nav-link">Direction</NavLink>
            </li>
            <li className="nav-item tabStyle">
                <NavLink to="/trailList/:location/weather" activeClassName="active selected" className="nav-link">Weather</NavLink>
            </li>
            <li className="nav-item tabStyle">
                <NavLink to="/trailList/:location/recommended-items" activeClassName="active selected" className="nav-link">Amazon</NavLink>
            </li>
        </ul>
    </div>

)