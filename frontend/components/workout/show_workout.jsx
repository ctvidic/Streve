import React from 'react';
import { NavLink } from 'react-router-dom'


class ShowWorkout extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            directionsService: new google.maps.DirectionsService(),
            directionsRenderer: new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                draggable: true,
                markerOptions: { draggable: true },
                polylineOptions: { strokeColor: "#FC4C02" }
            })
        }

        // this.state = this.props.workout
    }
    componentDidMount() {
        const mapOptions = {
            center: { lat: 40.7128, lng: -74.0060 },
            zoom: 12,
            mapId: "2635966e05b3c0d6",
            disableDefaultUI: true,
            zoomControl: true,
        }
        this.props.fetchWorkouts()

        this.map = new google.maps.Map(document.getElementById('showmap'), mapOptions);



    }
    findOrigin(coords){
        return{
            lat: parseFloat(coords[0]), lng: parseFloat(coords[1])
        }
    }

    findDestination(coords){
        return {
            lat: parseFloat(coords[coords.length - 2]), lng: parseFloat(coords[coords.length - 1])
        }
    }

    findWayPoints(coords){
        let newCoords = coords.slice();
        let mappedNewCoords = newCoords.slice(2, newCoords.length - 2);
        let finalArr = []
        for(let i = 0; i<mappedNewCoords.length; i+=2){
            finalArr.push({location: {location: {lat: parseFloat(mappedNewCoords[i]), lng: parseFloat(mappedNewCoords[i+1])}}})
        }
        debugger;
        return finalArr
    }
    calculateCoords(coords){
        
        this.state.directionsRenderer.setMap(this.map);
        let origin = this.findOrigin(this.props.workout.coordinates)
        let destination = this.findDestination(this.props.workout.coordinates)
        let newwaypoints = this.findWayPoints(this.props.workout.coordinates)
        this.state.directionsService.route({
            origin: origin,
            waypoints: newwaypoints,
            destination: destination,
            travelMode: 'WALKING',
        }, (response, status) => {
            if (status === 'OK') {
                debugger;
                // distance = response.routes[0].legs[0].distance.text;
                // this.setState({ distance, pace })
                this.state.directionsRenderer.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    render() {
        if (this.props.workout.coordinates !== undefined){
        this.calculateCoords(this.props.workout.coordinates)
        }

        return(<div>
            <div id="showWorkout">
            <li>Route Id:{this.props.workout.route_id} </li>
            <li>Type:{this.props.workout.workout_type}</li>
            <li>Duration:{this.props.workout.duration} </li>
            <li>Elevation Change:{this.props.workout.elevation_change} </li>
            <li>Distance:{this.props.workout.distance} </li>
            <NavLink to={`/users/${this.props.sessionId}`} 
                onClick={() => this.props.removeWorkout(this.props.workout)}>Remove Workout</NavLink>
            <li>Coordinates: {this.props.workout.coordinates}</li>
            </div>
            <div id='showmap'>
            </div>
            </div>)
    }
}

export default ShowWorkout