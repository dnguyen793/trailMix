import React, {Component} from 'react';
import hiker from '../assets/images/logo/hiker.gif';
import earth from '../assets/images/logo/earth.png';

class Logo extends Component{

    render(){        
        return (  
            <div className={this.props.logoClass}>
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
        );
    }
};

export default Logo;