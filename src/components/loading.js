import React, {Component} from 'react';

class Loading extends Component{

    render(){        
        return (  
            <div className="cantTouchThis">
                <div className="world"></div>
                <div className="hikerOrbit">
                    <div className="loadingHiker"></div>
                </div>
            </div>                 
        );
    }
};

export default Loading;