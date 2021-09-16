import React from 'react';
import { NavLink } from 'react-router-dom'
import AreaChart from "react-google-charts";

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
        return finalArr
    }
    calculateCoords(coords){
        this.props.workout.coordinates = this.props.workout.coordinates.split('X').map(val => parseFloat(val)).slice(0,-1)
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
                // distance = response.routes[0].legs[0].distance.text;
                // this.setState({ distance, pace })
                this.state.directionsRenderer.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
    eleChart(eleArr){
        let newArr = [['', '']]

        for (let i =0;i<eleArr.length; i++){
            newArr.push([i,parseInt(eleArr[i])])
        }
        return newArr
    }

    convertTime(mins){
        let hours = (mins / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        return `${rhours}:${rminutes}`
    }

    convertPace(duration, distance){
        return parseInt(duration/distance)
    }

    removeWorkout(){
        if (this.props.workout.user_id === this.props.sessionId){
        return(<div id="editDeleteLinks">
        <NavLink to={`/users/${this.props.sessionId}`}
                onClick={() => this.props.removeWorkout(this.props.workout)}>Remove Workout</NavLink>
            <NavLink to={`/workouts/${this.props.workoutId}/edit`}>Edit Workout</NavLink></div>)
            }
        }
    render() {
        let eleData
        let pace = this.convertPace(this.props.workout.duration, this.props.workout.distance)
        let newTime = this.convertTime(this.props.workout.duration)
        if (this.props.workout.coordinates !== undefined){
            this.calculateCoords(this.props.workout.coordinates)
        }
        if (this.props.workout.elevationData !== undefined){
            let splitEle = this.props.workout.elevationData.split(',')
            eleData = this.eleChart(splitEle);
        }
        let username 
        if (this.props.username[this.props.workout.user_id] !== undefined){
            username = this.props.username[this.props.workout.user_id].username
        }else{
            username = ""
        }
        return(<div id="showWorkout">
            <div id="showWorkoutstats">
            <div id="titleBox">
                    <h1>{this.props.workout.title}</h1>
                    {this.removeWorkout()}                    
            </div>
            <div id="box">
            <div id="boxleft">
                <div id="workoutdesc">{this.props.workout.description}</div>
            </div>
            <div id="boxright">
            {/* <li>Type:{this.props.workout.workout_type}</li> */}
            <div id="topBoxRight">
            <h1>Distance: {this.props.workout.distance} mi </h1>
            <h1>Elevation Gain: {this.props.workout.elevation_change} ft </h1>
            </div>
            <div id="topBoxRight">
            <h1>Created At: {this.props.workout.created_at} </h1>
            <h1>Created By: {username}</h1>
            </div>
           
            </div>
            </div>
            </div>
            <div id='showmap'>
            </div>
            <div id='eleChart'>
                <AreaChart
                    chartType="LineChart"
                    loader={<div>Loading Elevation Chart</div>}
                    data={eleData}
                    options={{
                        hAxis: {
                             textPosition: 'none' 
                        },
                        vAxis: {
                            title: 'Elevation (m)',
                        }, 
                        series: {
                            curveType: 'function'
                        },
                        legend: {
                            position: 'none'
                        }
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
            </div>)
    }
}

export default ShowWorkout