import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
// import axios from 'axios';
import { ajax } from 'jquery';
import chanceRain from '../assets/images/weather/chanceRain.png';
import darkCloud from '../assets/images/weather/darkCloud.png';
import fog from '../assets/images/weather/fog.png';
import partCloud from '../assets/images/weather/partCloud.png';
import rainbow from '../assets/images/weather/rainbow.png';
import rainy from '../assets/images/weather/rainy.png';
import snow from '../assets/images/weather/snow.png';
import storm from '../assets/images/weather/storm.png';
import sunny from '../assets/images/weather/sunny.png';
import thunder from '../assets/images/weather/thunder.png';
import wind from '../assets/images/weather/wind.png';
class Weather extends Component{
    constructor(props){
        super(props);
        this.state={
            input: null,
            day2: null,
            day3: null,
            latlong: '33.556,-117.7602',
        }

        this.httpRequest = new XMLHttpRequest();
    }

    componentWillMount(){
        let currentDate = new Date;
        currentDate = currentDate.setHours(0,0,0,0)/1000;
        this.setState({
            input: currentDate,
            day2: currentDate + 86400,
            day3: currentDate + 172800,
        }, () => {
            this.callWeather();
        });
        
    }

    // afterRequest(){
    //     if (this.httpRequest.readyState === XMLHttpRequest.DONE) {
    //         if (this.httpRequest.status === 200) {
    //           alert(this.httpRequest.responseText);
    //         } else {
    //           alert('There was a problem with the request.');
    //         }
    //     }
    // }
    
    callWeather(){
        ajax({
            url: 'https://api.darksky.net/forecast/5c290eacf434280dddb202f23f1d7daa/' + this.state.latlong + ',' + this.state.input,
            dataType: 'jsonp',
            method: 'get',
            success: resp => {
                console.log('Your MOM:', resp);
            }
        });
    }

    render(){
        return(
            <div className="weatherContainer">
                <div className="dateContainer">
                    <div className="datesSelect">
                        <input type="date" className="date"/>

                    </div>
                </div>
                <div className="conditionsContainer">
                    <div className="day1">
                        <div className="currentDay">Day 1</div>
                        <div className="day1Summary daySum"></div>
                        <div className="day1High dayHigh">High: </div>
                        <div className="day1Low dayLow">Low: </div>
                        <div className="day1Rain dayPrecip">Chance of Rain: </div>
                    </div>
                    <div className="day2">
                        <div className="currentDay">Day 2</div>
                        <div className="day2Summary daySum"></div>
                        <div className="day2High dayHigh">High: </div>
                        <div className="day2Low dayLow">Low: </div>
                        <div className="day2Rain dayPrecip">Chance of Rain: </div>
                    </div>
                    <div className="day3">
                        <div className="currentDay">Day 3</div>
                        <div className="day3Summary daySum"></div>
                        <div className="day3High dayHigh">High: </div>
                        <div className="day3Low dayLow">Low: </div>
                        <div className="day3Rain dayPrecip">Chance of Rain: </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Weather;