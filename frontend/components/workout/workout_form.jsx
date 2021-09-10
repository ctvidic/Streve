import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// import { join } from 'path/posix';



class WorkoutForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            workout: props.workout,
            pins: this.props.pins,
            directionsRenderer: new google.maps.DirectionsRenderer({ 
                draggable: true, 
                markerOptions: { draggable: true },
                suppressMarkers: true,
                polylineOptions: { strokeColor: "#FC4C02"}
             }),
            directionsService: new google.maps.DirectionsService(),
            elevationService: new google.maps.ElevationService(),
            distance: '0.0 mi',
            pace: '0 mph',
            climb: '0',
            descent: '0',
            duration: 0,
            eleArr: [],
            estTime: '0 mins',
            workout_type: 'run'
        }
        this.origin=''
        this.addPin= this.addPin.bind(this);
        this.calculateAndDisplayRoutes = this.calculateAndDisplayRoutes.bind(this)
        this.updateWorkoutType = this.updateWorkoutType.bind(this)
    }
    submitForm(){
        let pinEdit = this.state.pins.map(pin => [pin.location.lat, pin.location.lng])
        let newPinEdit = Array.prototype.concat.apply([], pinEdit);
        let inputEle = this.state.eleArr.map(ele => parseInt(ele))
        let submit= {user_id: this.state.workout.user_id, 
            route_id: parseInt(this.state.route_id) || null,
            workout_type: this.state.workout_type || 'run',
            duration: parseInt(this.state.duration) || null,
            elevation_change: parseInt(this.state.climb) || null,
            distance: parseInt(this.state.distance) || null,
            coordinates: newPinEdit,
            elevationData: inputEle
        }
        // this.state.workout
        this.props.createWorkout(submit).then(() => {
          this.props.history.push(`../users/${this.props.user_id}`)
        })
    }

    componentDidMount(){
        const mapOptions = {
            center: { lat: 40.7128, lng: -74.0060 },
            zoom: 12,
            mapId: "2635966e05b3c0d6",
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

    convPoints(points){
        let newPoints = points.map(pointObj => new google.maps.LatLng(pointObj.location.lat, pointObj.location.lng))
        // let newString = ''
        // // for(let i =0; i<newPoints.length; i++){
        // //     newString += newPoints[i][0] +','+newPoints[i][1] + ' | '
        // // }
        // // debugger
        return newPoints
    }

    findClimbAndDescent(eleArr){
        let descent = 0.0
        let climb = 0.0
        for(let i =0;i<eleArr.length-1; i++){
            if(eleArr[i+1]> eleArr[i]){
                climb += eleArr[i+1]-eleArr[i]
            }else{
                descent += eleArr[i] - eleArr[i+1]
            }
        }
        return [Math.floor(climb),Math.floor(descent)]
    }
    calculateAndDisplayRoutes(map) {
            let distance;
            let pace;
            let estTime
            let travelMode
            if (this.state.workout_type === 'cycling'){
                travelMode = 'BICYCLING'
            }else{
                travelMode = 'WALKING'
            }
            this.state.directionsRenderer.setMap(map);
            let waypoints = this.state.pins.slice();
            let elePoints = this.convPoints(waypoints);
            let origin = waypoints.shift().location;
            let destination = waypoints.pop().location;
            let newwaypoints = waypoints.map(pin => ({location: pin, stopover: false}))
            this.state.directionsService.route({
                origin: origin,
                destination: destination,
                waypoints: newwaypoints,
                travelMode: travelMode,
            }, (response, status) => {
                if (status === 'OK') {
                    distance = response.routes[0].legs[0].distance.text;
                    estTime = response.routes[0].legs[0].duration.text;
                    this.setState({distance, pace, estTime})
                    this.state.directionsRenderer.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
            this.state.elevationService.getElevationAlongPath({
                path: elePoints,
                samples: 256
            }, (response,status) => {
                let eleArr
                if (status === 'OK') {
                    eleArr = response.map(eleObj => eleObj.elevation)
                    let climbAndDescent= this.findClimbAndDescent(eleArr)
                    this.setState({ climb: climbAndDescent[0], descent: climbAndDescent[1], eleArr: eleArr})
                }else{
                    window.alert('Elevation request failed due to ' + status);
                }
            });
            // this.updatePins();
            // this.setState({workout_type: 'run'})
    }

    addPin(location, map){
        let visibleValue = true
        if (this.state.pins.length > 0){
            visibleValue = false
        }
        let pin = new google.maps.Marker({
            position: location,
            map,
            visible: visibleValue,
        });
        let newlat = pin.getPosition().lat();
        let newlng = pin.getPosition().lng();
        
        this.state.pins.push({location: {lat: newlat, lng: newlng}})

        if(this.state.pins.length > 1){
            this.calculateAndDisplayRoutes(map)
        }
    }

    loopRoute(){
        if (this.state.pins.length > 1){
        let initial = this.state.pins[0];
        let newLatLng = new google.maps.LatLng(parseFloat(initial.location.lat), parseFloat(initial.location.lng));
        let displayMap = this.map
        let pin = new google.maps.Marker({
            position: newLatLng,
            displayMap,
            visible: true,
        });
        let newlat = pin.getPosition().lat();
        let newlng = pin.getPosition().lng();

        this.state.pins.push({ location: { lat: newlat, lng: newlng } })

        this.calculateAndDisplayRoutes(displayMap)

        }
    }

    activityIcon(workout_type){
        if (workout_type==='run' || workout_type === undefined){
            return (<i className="fas fa-running"></i>)
        }
    }

    update(text) {
        return e => {
             this.setState({ [text]: e.currentTarget.value })}
    }
    updateWorkoutType(e){
        const input = e.target.value;
        this.setState({ workout_type: input }, () => {
            this.calculateAndDisplayRoutes(this.map)
        })
    }   

    render(){
        debugger;
        let pace
        if ((parseInt(this.state.duration) / 60) === 0){
            pace = '0.0'
        }else{
            let targetNum = parseFloat(this.state.distance) / (parseFloat(this.state.duration) / 60)
            pace = (Math.round(targetNum * 100) / 100).toFixed(1);
        }
        return(
            <div id="workoutform">
                <form onSubmit={()=>this.submitForm()} id='mapForm'>
                    <div id="mapInput">
                    {/* <label>Choose a route
                        <input type='text' onChange={this.update('route_id')} value={this.state.route_id}></input>
                    </label>
                    <br></br> */}
                    <h1 id="routeHeader">Workout Stats</h1>
                    <label id="workoutSelect" >Workout Type
                    <br></br>
                    <select onChange={this.updateWorkoutType} value={this.state.workout_type}>
                        <option value="run">Run</option>
                        <option value="swim">Swim</option>
                        <option value="cycling">Cycling</option>
                    </select>
                    <h1>{this.state.workout_type}</h1>
                    {/* <button type='button' onClick={this.update('workout_type') value='cycling'}>Cycling</button> */}
                    <div id='activityIcon'>{this.activityIcon(this.state.workout_type)}</div>
                    </label>
                    <br></br>
                    {/* <label>Elevation Change
                        <input type='text' onChange={this.update('elevation_change')} value={this.state.elevation_change}></input>
                    </label>
                    <br></br> */}
                    {/* <label>Distance
                        <input type='text' onChange={this.update('distance')} value={this.state.distance}></input>
                    </label> */}
                    <br></br>
                    <button id="submitWorkout" value='submit'>Submit</button>
                    <button id='loop' type='button' onClick={() => this.loopRoute()}>Loop Route</button>

                    </div>
                    <div id='map'>
                        MAP
                    </div>
                </form>

                <div id="bottombar">
                    <div id="showDistance">
                        <div id="distanceText">
                        Distance:
                        </div>
                        <div id="distanceDisplay">
                            {this.state.distance}
                        </div>
                    </div>
                    <div id="estMovingTime">
                        <div id="estText">
                            Est. Time
                        </div>
                        <div id="estDisplay">
                            {this.state.estTime}
                        </div>
                    </div>
                    <div id="climb">
                        <div id="climbText">
                            Elevation Gain
                        </div>
                        <div id="climbDisplay">
                            {this.state.climb} ft
                        </div>
                    </div>
                    <div id="climb">
                        <div id="climbText">
                            Elevation Loss
                        </div>
                        <div id="climbDisplay">
                            {this.state.descent} ft
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default WorkoutForm
//GoogleApiWrapper({ apiKey: window.googleAPIKey})(WorkoutForm)
// export default WorkoutForm
// window.googleAPIKey
// "AIzaSyAb2z7bbhF1gSlA7MbjLjg_kFhQzkTIad4"