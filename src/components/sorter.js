import React, {Component} from 'react';

class Sorter extends Component {
    
    constructor(props){
        super(props);
        this.sortMethods = {
            ratingDesc: (a,b)=> b.stars - a.stars,
            lengthAsc: (a,b)=> a.length - b.length,
            lengthDesc: (a,b)=> b.length - a.length,  
            difficultyAsc: (a,b)=> a.difficultyNum - b.difficultyNum,           
            difficultyDesc: (a,b)=> b.difficultyNum - a.difficultyNum 
        }
    }

    /**
     * Handle when the user change the select and send back to the trailList component the method to order
     * @param {*} event 
     */
    handleChange(event){
        const method = event.target.value;
        this.props.sortTrailArray(this.sortMethods[method]);
    }

    render(){        
        return (
            <div className='sorterContainer'>
                <label>Sort by: </label>
                <select onChange={this.handleChange.bind(this)}>
                    <option value='ratingDesc'>Rating:High to Low</option>
                    <option value='lengthDesc'>Length:High to Low</option>    
                    <option value='lengthAsc'>Length:Low to High</option>     
                    <option value='difficultyDesc'>Difficulty:High to Low</option>     
                    <option value='difficultyAsc'>Difficulty:Low to High</option>                   
                </select>
            </div>            
        );
    }
}

export default Sorter;