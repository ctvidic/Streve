import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// import { join } from 'path/posix';



class WorkoutForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            workout: this.props.workout,
            pins: this.props.pins,
            directionsRenderer: new google.maps.DirectionsRenderer({ draggable: true, markerOptions: { draggable: true } }),
            directionsService: new google.maps.DirectionsService()
        }
        this.addPin= this.addPin.bind(this);

    }
    submitForm(){
        this.props.createWorkout(this.state).then(() => {
          this.props.history.push(`../users/${this.props.user_id}`)
        })
    }

    componentDidMount(){
        const mapOptions = {
            center: { lat: 40.7128, lng: -74.0060 },
            zoom: 12,
            mapId: "8e0a97af9386fef",
            disableDefaultUI: true,
            zoomControl: true,
        }
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // this.directionsRenderer.setMap(this.map);

        const onChangeHandler = function () {
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        };
        
        google.maps.event.addListener(this.map, "click", (event) => {
            this.addPin(event.latLng, this.map)
        });

    }

    calculateAndDisplayRoutes(map) {
            this.state.directionsRenderer.setMap(map);  
            let waypoints = this.state.pins.slice();
            let origin = waypoints.shift()
            let destination = waypoints.pop()
            this.state.directionsService.route({
                origin: origin,
                destination: destination,
                waypoints: waypoints,
                travelMode: 'WALKING'
            }, (response, status) => {
                if (status === 'OK') {
                    this.state.directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
    }

    addPin(location, map){
        let pin = new google.maps.Marker({
            position: location,
            map,
            title: "Hello World!",
        });
        let newlat = pin.getPosition().lat();
        let newlng = pin.getPosition().lng();
        
        this.state.pins.push({lat: newlat, lng: newlng})

        if(this.state.pins.length > 1){
            this.calculateAndDisplayRoutes(map)
        }
    }


    update(text) {
        return e => this.setState({ [text]: e.currentTarget.value })
    }

    render(){
        const workout = { user_id: 17, route_id: 2, workout_type: 'run', duration: 200, elevation_change: 200, distance: 200 }

        return(
            <div id="workoutform">
                <h1>New Workout Form</h1>
                <form onSubmit={()=>this.submitForm()}>
                    <label>Choose a route
                        <input type='text' onChange={this.update('route_id')} value={this.state.route_id}></input>
                    </label>
                    <br></br>
                    <label>Workout Type
                    <select onChange={this.update('workout_type')}>
                        <option value="run">Run</option>
                        <option value="swim">Swim</option>
                        <option value="cycling">Cycling</option>
                    </select>
                    </label>
                    <br></br>
                    <label>Duration
                    <input type='text' onChange={this.update('duration')} value={this.state.workout.duration}></input>
                    </label>
                    <br></br>
                    <label>Elevation Change
                        <input type='text' onChange={this.update('elevation_change')} value={this.state.workout.elevation_change}></input>
                    </label>
                    <br></br>
                    <label>Distance
                        <input type='text' onChange={this.update('distance')} value={this.state.workout.distance}></input>
                    </label>
                    <br></br>
                    <button value='submit'>Submit</button>
                    <div id='map'>
                        MfasdfasdfasdfasdfasdfasdfaAP
                    </div>
                </form>
            </div>
        )
    }
}

export default GoogleApiWrapper({ apiKey:'AIzaSyA9qS2wjPALTYuRbFAVKeC0oz6sB0jrj4g'})(WorkoutForm)