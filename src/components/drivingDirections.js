import React, { Component } from 'react';

class Direction extends Component {
	constructor(props){
		super(props);
		this.directionsService = new google.maps.DirectionsService();
		this.directionsDisplay = new google.maps.DirectionsRenderer();
		this.state = {
			trailInfo: {}
		};

		this.initDirectionMap = this.initDirectionMap.bind(this);
		this.getDirection = this.getDirection.bind(this);
		this.removeRoute = this.removeRoute.bind(this);
	}

	initDirectionMap(trailInfo,initLat,initLng) {
		const {latitude, longitude} = trailInfo;
		const trailCoord = {latitude, longitude};

		this.directionsDisplay.setMap(map);
		this.directionsDisplay.setPanel(document.querySelector('.directionsContainerMargin'));
		this.getDirection(trailCoord,initLat,initLng);
	}

	getDirection(destination,initLat,initLng) {
		const direction = document.querySelector('.directionsContainerMargin');
		direction.innerHTML = '';
		directionsDisplay.set('directions', null);

		const start = {lat:initLat,lng:initLng};
		const {lat, lon} = destination;
		const request = {
	  		origin: start,
	  		destination: {lat:lat, lng:lon},
	  		travelMode: 'DRIVING'
		};
		directionsService.route(request, (response, status) => {
		    if (status == 'OK') {
	      		directionsDisplay.setDirections(response);
	      		return response;

	      		console.log(response.routes);
	      		console.log('instructions',response.routes[0].legs[0].steps);
	      		console.log(response.routes[0].legs[0].duration.text);
	      		var titleDiv = document.createElement('h2');
	      		var titleText = document.createTextNode('Driving directions');
	      		direction.appendChild(titleDiv);
	      		titleDiv.appendChild(titleText);
	      		var distanceDiv = document.createElement('div');
	      		var distanceText = document.createTextNode('Total distance: ' + response.routes[0].legs[0].distance.text + ';');
	      		var durationDiv = document.createElement('div');
	      		distanceDiv.style.fontWeight = 'bold';
	      		durationDiv.style.fontWeight = 'bold';
	      		var durationText = document.createTextNode('Total duration: ' + response.routes[0].legs[0].duration.text + ';');
	      		var lnBr = document.createElement('br');
	      		var instructions = response.routes[0].legs[0].steps;
	      		distanceDiv.appendChild(distanceText);
	      		durationDiv.appendChild(durationText);
	      		direction.appendChild(distanceDiv);
	      		direction.appendChild(durationDiv);
	      		direction.appendChild(lnBr);
	      		var instructionUl = document.createElement('ul');
	      		for (var i = 0; i < instructions.length; i++) {
	      			var instructionLi = document.createElement('li');
	      			var instructionText = instructions[i].instructions;
	      			instructionLi.innerHTML = instructionText;
	        		instructionUl.appendChild(instructionLi);
	      		}
	      	direction.appendChild(instructionUl);
		    } else {
		    	console.log('directionsService not working properly');
		    }
    	});
	}

	removeRoute(){
		directionsDisplay.set('directions', null);
	}
}

export default Direction;
