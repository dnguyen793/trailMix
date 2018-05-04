import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { ajax } from 'jquery';
import darkCloud from '../assets/images/weather/darkCloud.png';
import fog from '../assets/images/weather/fog.png';
import partCloud from '../assets/images/weather/partCloud.png';
import rainbow from '../assets/images/weather/rainbow.png';
import rainy from '../assets/images/weather/rainy.png';
import snow from '../assets/images/weather/snow.png';
import sunny from '../assets/images/weather/sunny.png';
import wind from '../assets/images/weather/wind.png';
class Weather extends Component{
    constructor(props){
        super(props);
        this.weatherArray = [];
        this.state={
            day1: null,
            day2: null,
            day3: null,
            latlong: '33.556,-117.7602',
            day1Back: {},
            day2Back: {},
            day3Back: {},
            day1Date: this.findCurrentDate(),
            day1Text:{
                summary: '',
                high: 'High: ',
                low: 'Low: ',
                rain: 'Chance of Rain: '
            },
            day2Date: this.findDay2Date(),
            day2Text:{
                summary: '',
                high: 'High: ',
                low: 'Low: ',
                rain: 'Chance of Rain: '
            },
            day3Date: this.findDay3Date(),
            day3Text:{
                summary: '',
                high: 'High: ',
                low: 'Low: ',
                rain: 'Chance of Rain: '
            }
        }

        this.httpRequest = new XMLHttpRequest();
    }
    findCurrentDate(){
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        return `${mm}/${dd}/${yyyy}`
    }
    findDay2Date(){
        let today = new Date();
        let day2 = new Date(today);
        day2.setDate(today.getDate()+1);
        let dd = day2.getDate();
        let mm = day2.getMonth()+1;
        let yyyy = day2.getFullYear();
        return `${mm}/${dd}/${yyyy}`

        // return `${day2}`
    }
    findDay3Date(){
        let today = new Date();
        let day3 = new Date(today);
        day3.setDate(today.getDate()+2);
        let dd = day3.getDate();
        let mm = day3.getMonth()+1;
        let yyyy = day3.getFullYear();
        return `${mm}/${dd}/${yyyy}`
    }
    componentWillMount(){
        let currentDate = new Date;
        currentDate = currentDate.setHours(0,0,0,0)/1000;

        console.log('RAINBOW:', rainbow);
        this.setState({
            day1: currentDate,
            day2: currentDate + 86400,
            day3: currentDate + 172800,
            day1Back:{
                backgroundImage: `url(${rainbow})`,
                backgroundColor: 'rgb(10, 181, 233)',
                backgroundSize:'cover',
            },
            day2Back:{
                backgroundImage: `url(${rainbow})`,
                backgroundColor: 'rgb(10, 181, 233)',
                backgroundSize:'cover',
            },
            day3Back:{
                backgroundImage: `url(${rainbow})`,
                backgroundColor: 'rgb(10, 181, 233)',
                backgroundSize:'cover',
            },
        }, () => {
            this.callWeather();
        });
        
    }
    
    callWeather(){
        ajax({
            url: 'https://api.darksky.net/forecast/5c290eacf434280dddb202f23f1d7daa/' + this.state.latlong + ',' + this.state.day1,
            dataType: 'jsonp',
            method: 'get',
            success: response => {
                    console.log(response);
                    console.log(this.state.day1Back.backgroundImage);
                    console.log('day1 '+response.currently.icon);
                    let iconName1 = response.currently.icon;
                    console.log(iconName1);
                    let backgroundImg;
                    let background_color;
                    this.weatherArray.push(iconName1);
                    switch (iconName1){
                        case 'partly-cloudy-night':
                        case 'clear-night':
                        case 'clear-day':
                            backgroundImg = `${sunny}`;
                            background_color = 'rgb(10, 181, 233)'
                            break;
                        case 'cloudy':
                            backgroundImg = `${darkCloud}`;
                            background_color = 'rgb(10, 181, 233)';
                            break;
                        case 'partly-cloudy-day':
                            backgroundImg = `${partCloud}`;
                            background_color = 'rgb(255, 143, 0)';
                            break;
                        case 'rain':
                            backgroundImg = `${rainy}`;
                            background_color = 'rgb(139, 135, 129)';
                            break;
                        case 'sleet':
                        case 'snow':
                            backgroundImg = `${snow}`;
                            background_color = 'rgb(142, 107, 168)';
                            break;
                        case 'wind':
                            backgroundImg = `${wind}`;
                            background_color = 'rgb(192, 196, 197)';
                            break;
                        case 'fog':
                            backgroundImg = `${fog}`;
                            background_color = 'rgb(10, 181, 233)';
                            break;
                    }
                    let rainText;
                    if(isNaN(response.daily.data[0].precipProbability)){
                        rainText = 'Chance of Rain: Unknown'
                    } else {
                        rainText = `Chance of Rain: ${((response.daily.data[0].precipProbability)*100)}%`
                    }

                    this.setState({
                        day1Back:{
                            backgroundImage: `url(${backgroundImg})`,
                            backgroundColor: background_color,
                            backgroundSize:'cover',
                        },
                        day1Text:{
                            summary: response.daily.data[0].summary,
                            high: `High: ${response.daily.data[0].temperatureHigh.toFixed(0)} F`,
                            low: `Low: ${response.daily.data[0].temperatureLow.toFixed(0)} F`,
                            rain: rainText,
                        }
                    })          
            }, 
            error: response => {
                this.setState({
                    day1Text:{summary:'Sorry, we had trouble getting data for that day.'}
                })
            }
        });

        ajax({
            url: 'https://api.darksky.net/forecast/5c290eacf434280dddb202f23f1d7daa/' + this.state.latlong + ',' + this.state.day2,
            dataType: 'jsonp',
            method: 'get',
            success: response => {
                    console.log(response);
                    console.log(this.state.day2Back.backgroundImage);
                    console.log('day2 '+response.currently.icon);
                    let iconName2 = response.currently.icon;
                    console.log(iconName2);
                    let backgroundImg;
                    let background_color;
                    this.weatherArray.push(iconName2);
                    switch (iconName2){
                        case 'partly-cloudy-night':
                        case 'clear-night':
                        case 'clear-day':
                            backgroundImg = `${sunny}`;
                            background_color = 'rgb(10, 181, 233)'
                            break;
                        case 'cloudy':
                            backgroundImg = `${darkCloud}`;
                            background_color = 'rgb(10, 181, 233)';
                            break;
                        case 'partly-cloudy-day':
                            backgroundImg = `${partCloud}`;
                            background_color = 'rgb(255, 143, 0)';
                            break;
                        case 'rain':
                            backgroundImg = `${rainy}`;
                            background_color = 'rgb(139, 135, 129)';
                            break;
                        case 'sleet':
                        case 'snow':
                            backgroundImg = `${snow}`;
                            background_color = 'rgb(142, 107, 168)';
                            break;
                        case 'wind':
                            backgroundImg = `${wind}`;
                            background_color = 'rgb(192, 196, 197)';
                            break;
                        case 'fog':
                            backgroundImg = `${fog}`;
                            background_color = 'rgb(10, 181, 233)';
                            break;
                    }
                    let rainText;
                    if(isNaN(response.daily.data[0].precipProbability)){
                        rainText = 'Chance of Rain: Unknown'
                    } else {
                        rainText = `Chance of Rain: ${((response.daily.data[0].precipProbability)*100)}%`
                    }

                    this.setState({
                        day2Back:{
                            backgroundImage: `url(${backgroundImg})`,
                            backgroundColor: background_color,
                            backgroundSize:'cover',
                        },
                        day2Text:{
                            summary: response.daily.data[0].summary,
                            high: `High: ${response.daily.data[0].temperatureHigh.toFixed(0)} F`,
                            low: `Low: ${response.daily.data[0].temperatureLow.toFixed(0)} F`,
                            rain: rainText,
                        }
                    })          
            }, 
            error: response =>{
                this.setState({
                    day2Text:{summary:'Sorry, we had trouble getting data for that day.'}
                })
            }
        });
        ajax({
            url: 'https://api.darksky.net/forecast/5c290eacf434280dddb202f23f1d7daa/' + this.state.latlong + ',' + this.state.day3,
            dataType: 'jsonp',
            method: 'get',
            success: response => {
                    console.log(response);
                    console.log(this.state.day3Back.backgroundImage);
                    console.log('day2 '+response.currently.icon);
                    let iconName3 = response.currently.icon;
                    console.log(iconName3);
                    let backgroundImg;
                    let background_color;
                    this.weatherArray.push(iconName3);
                    switch (iconName3){
                        case 'partly-cloudy-night':
                        case 'clear-night':
                        case 'clear-day':
                            backgroundImg = `${sunny}`;
                            background_color = 'rgb(10, 181, 233)'
                            break;
                        case 'cloudy':
                            backgroundImg = `${darkCloud}`;
                            background_color = 'rgb(10, 181, 233)';
                            break;
                        case 'partly-cloudy-day':
                            backgroundImg = `${partCloud}`;
                            background_color = 'rgb(255, 143, 0)';
                            break;
                        case 'rain':
                            backgroundImg = `${rainy}`;
                            background_color = 'rgb(139, 135, 129)';
                            break;
                        case 'sleet':
                        case 'snow':
                            backgroundImg = `${snow}`;
                            background_color = 'rgb(142, 107, 168)';
                            break;
                        case 'wind':
                            backgroundImg = `${wind}`;
                            background_color = 'rgb(192, 196, 197)';
                            break;
                        case 'fog':
                            backgroundImg = `${fog}`;
                            background_color = 'rgb(10, 181, 233)';
                            break;
                    }
                    let rainText;
                    if(isNaN(response.daily.data[0].precipProbability)){
                        rainText = 'Chance of Rain: Unknown'
                    } else {
                        rainText = `Chance of Rain: ${((response.daily.data[0].precipProbability)*100)}%`
                    }

                    this.setState({
                        day3Back:{
                            backgroundImage: `url(${backgroundImg})`,
                            backgroundColor: background_color,
                            backgroundSize:'cover',
                        },
                        day3Text:{
                            summary: response.daily.data[0].summary,
                            high: `High: ${response.daily.data[0].temperatureHigh.toFixed(0)} F`,
                            low: `Low: ${response.daily.data[0].temperatureLow.toFixed(0)} F`,
                            rain: rainText,
                        }
                    })          
            }, 
            error: response =>{
                this.setState({
                    day3Text:{summary:'Sorry, we had trouble getting data for that day.'}
                })
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
                    <div className="day1" style={this.state.day1Back}>
                        <div className="currentDay" >{this.state.day1Date}</div>
                        <div className="day1Summary daySum">{this.state.day1Text.summary}</div>
                        <div className="day1High dayHigh">{this.state.day1Text.high}</div>
                        <div className="day1Low dayLow">{this.state.day1Text.low}</div>
                        <div className="day1Rain dayPrecip">{this.state.day1Text.rain}</div>
                    </div>
                    <div className="day2" style={this.state.day2Back}>
                        <div className="currentDay">{this.state.day2Date}</div>
                        <div className="day2Summary daySum">{this.state.day2Text.summary}</div>
                        <div className="day2High dayHigh">{this.state.day2Text.high}</div>
                        <div className="day2Low dayLow">{this.state.day2Text.low}</div>
                        <div className="day2Rain dayPrecip">{this.state.day2Text.rain}</div>
                    </div>
                    <div className="day3" style={this.state.day3Back}>
                        <div className="currentDay">{this.state.day3Date}</div>
                        <div className="day3Summary daySum">{this.state.day3Text.summary}</div>
                        <div className="day3High dayHigh">{this.state.day3Text.high}</div>
                        <div className="day3Low dayLow">{this.state.day3Text.low}</div>
                        <div className="day3Rain dayPrecip">{this.state.day3Text.rain}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Weather;
