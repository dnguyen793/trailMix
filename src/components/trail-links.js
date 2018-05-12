import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/trail-links.css';

export default props => (
    <div className="tabsContainer">
        <ul className="nav nav-tabs">
            <li className="nav-item tabStyle">
                <NavLink to="/planTrip/:lat/lat/:long/long/directions" activeClassName="active selected" className="nav-link">Directions</NavLink>
            </li>
            <li className="nav-item tabStyle">
                <NavLink to="/planTrip/:lat/lat/:long/long/weather" activeClassName="active selected" className="nav-link">Weather</NavLink>
            </li>
            <li className="nav-item tabStyle">
                <NavLink to="/planTrip/:lat/lat/:long/long/details" activeClassName="active selected" className="nav-link">Details</NavLink>
            </li>
        </ul>
    </div>

)