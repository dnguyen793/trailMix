import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';

class DateInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedDate: moment(),
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(date){
        const valueOfInput = date.format();
        this.setState({
            selectedDate:date
        });

        this.props.updateWeather(valueOfInput);
    }
    render(){
        return(
            <DatePicker selected={this.state.selectedDate} onSelect={this.handleChange} />
        )
    }
}

export default DateInput;