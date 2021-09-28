import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// import { join } from 'path/posix';



class WorkoutForm extends React.Component{
    constructor(props){
        super(props);
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
            workout_type: 'run',
            title: '',
            description: '',
            static_map: '',
            on_road: true,
            polypath: new google.maps.Polyline()
        }
        this.origin=''
        this.addPin= this.addPin.bind(this);
        this.calculateAndDisplayRoutes = this.calculateAndDisplayRoutes.bind(this)
        this.updateWorkoutType = this.updateWorkoutType.bind(this)
        this.removeLastPoint = this.removeLastPoint.bind(this)
        this.reloadMap = this.reloadMap.bind(this)
        
    }
    componentWillUnmount() {
        this.props.clearErrors();
    }


    submitForm(e){
        e.preventDefault();
        let pinEdit = this.state.pins.map(pin => [pin.location.lat, pin.location.lng])
        let newPinEdit = Array.prototype.concat.apply([], pinEdit);
        let inputEle = this.state.eleArr.map(ele => parseInt(ele))
        let pinText = ''
        for(let i=0; i<newPinEdit.length; i++){
            pinText+= newPinEdit[i]+'X'
        }
        inputEle = inputEle.toString();
        let newDistance = this.state.distance;
        newDistance = newDistance.replace(/[^0-9.]/g, '');
        // let pinSplit = pinText.split('X').map(val => parseFloat(val))
        let submit= {user_id: this.state.workout.user_id, 
            route_id: parseInt(this.state.route_id) || null,
            workout_type: this.state.workout_type || 'run',
            duration: parseInt(this.state.duration) || null,
            elevation_change: parseInt(this.state.climb) || null,
            distance: parseInt(newDistance) || null,
            coordinates: pinText,
            elevationData: inputEle,
            title: this.state.title,
            description: this.state.description,
            static_map: this.state.static_map
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

        this.polypath = {}
        
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
            let static_map
            if (this.state.pins.length > 1){
                this.state.directionsRenderer.setMap(map);
            let waypoints = this.state.pins.slice();
            // let elePoints = this.convPoints(waypoints);
            let elePoints = [];
            let origin = waypoints.shift().location;
            let destination = waypoints.pop().location;
            let newwaypoints = waypoints.map(pin => ({location: pin, stopover: false}))
            if (this.state.on_road === true){
            this.state.directionsService.route({
                origin: origin,
                destination: destination,
                waypoints: newwaypoints,
                travelMode: 'WALKING',
            }, (response, status) => {
                if (status === 'OK') {
                    for (let i = 0; i < response.routes[0].legs[0].steps.length; i++){
                        elePoints = elePoints.concat(response.routes[0].legs[0].steps[i].lat_lngs)
                    }
                    debugger;
                    let forLoopLength = elePoints.length
                    if (elePoints.length > 256 && elePoints.length < 10000){
                        for(let i=0;i<(forLoopLength - 256);i++){
                            elePoints.splice(Math.random()*elePoints.length,1)
                        }
                    }else if(elePoints.length>=10000){
                        elePoints = this.convPoints(waypoints);
                    }
           
                    static_map = response.routes[0].overview_polyline;
                    let distance = response.routes[0].legs[0].distance.text;
                    let calcDistance = response.routes[0].legs[0].distance.value * 0.00062137;
                    if (this.state.workout_type === 'run'){
                        estTime = `${Math.ceil(calcDistance/6*60)} mins`
                    } else if (this.state.workout_type === 'cycling'){
                        estTime = `${Math.ceil(calcDistance/12*60)} mins`
                    }
                    if (distance > 999){
                        this.setState({distance: 999})
                    }else{
                        this.setState({distance})
                    }
                    this.setState({pace, estTime, static_map})
                    this.state.directionsRenderer.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
                this.state.elevationService.getElevationAlongPath({
                    path: elePoints,
                    samples: 256
                }, (response, status) => {
                    let eleArr
                    if (status === 'OK') {
                        eleArr = response.map(eleObj => eleObj.elevation)
                        let climbAndDescent = this.findClimbAndDescent(eleArr)
                        this.setState({ climb: climbAndDescent[0], descent: climbAndDescent[1], eleArr: eleArr })
                    } else {
                        window.alert('Elevation request failed due to ' + status);
                    }
                });
            });}

                // var polypath= new google.maps.Polyline({
                //             path: elePoints,
                //             geodesic: true,
                //             strokeColor: "#FF0000",
                //             strokeOpacity: 1.0,
                //             strokeWeight: 2,
                // })
                // if (this.state.on_road){ 
                //     polypath.setMap(null);
                // }else{
                //     polypath.setMap(this.map);
                //     this.state.directionsRenderer.setMap(null);
                // }

          
         
            }
            
            // this.updatePins();
            // this.setState({workout_type: 'run'})
    }
    reloadMap(){
        const mapOptions = {
            center: { lat: 40.7128, lng: -74.0060 },
            zoom: 12,
            mapId: "2635966e05b3c0d6",
            disableDefaultUI: true,
            zoomControl: true,
        }
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        google.maps.event.addListener(this.map, "click", (event) => {
            this.addPin(event.latLng, this.map)
        });
    }
    changeRoads(){
        this.calculateAndDisplayRoutes(this.map)
        if (this.state.on_road){    
            this.setState({ on_road: false }, () => {
                this.calculateAndDisplayRoutes(this.map)
            })
        }else{
            this.setState({ on_road: true }, () => {
                this.reloadMap()
                this.calculateAndDisplayRoutes(this.map)
            })
        }
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

        let pinCopy = this.state.pins.slice();
        // this.setState({ pins: pinCopy.push({ location: { lat: newlat, lng: newlng } })})
        this.state.pins.push({ location: { lat: newlat, lng: newlng } })

        this.calculateAndDisplayRoutes(displayMap)

        }
    }

    activityIcon(workout_type){
        if (workout_type==='run' || workout_type === undefined){
            return (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="running" class="svg-inline--fa fa-running fa-w-13" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 416 512"><path fill="currentColor" d="M272 96c26.51 0 48-21.49 48-48S298.51 0 272 0s-48 21.49-48 48 21.49 48 48 48zM113.69 317.47l-14.8 34.52H32c-17.67 0-32 14.33-32 32s14.33 32 32 32h77.45c19.25 0 36.58-11.44 44.11-29.09l8.79-20.52-10.67-6.3c-17.32-10.23-30.06-25.37-37.99-42.61zM384 223.99h-44.03l-26.06-53.25c-12.5-25.55-35.45-44.23-61.78-50.94l-71.08-21.14c-28.3-6.8-57.77-.55-80.84 17.14l-39.67 30.41c-14.03 10.75-16.69 30.83-5.92 44.86s30.84 16.66 44.86 5.92l39.69-30.41c7.67-5.89 17.44-8 25.27-6.14l14.7 4.37-37.46 87.39c-12.62 29.48-1.31 64.01 26.3 80.31l84.98 50.17-27.47 87.73c-5.28 16.86 4.11 34.81 20.97 40.09 3.19 1 6.41 1.48 9.58 1.48 13.61 0 26.23-8.77 30.52-22.45l31.64-101.06c5.91-20.77-2.89-43.08-21.64-54.39l-61.24-36.14 31.31-78.28 20.27 41.43c8 16.34 24.92 26.89 43.11 26.89H384c17.67 0 32-14.33 32-32s-14.33-31.99-32-31.99z"></path></svg>)
        } else if(workout_type === 'cycling'){
            return (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="biking" class="svg-inline--fa fa-biking fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M400 96a48 48 0 1 0-48-48 48 48 0 0 0 48 48zm-4 121a31.9 31.9 0 0 0 20 7h64a32 32 0 0 0 0-64h-52.78L356 103a31.94 31.94 0 0 0-40.81.68l-112 96a32 32 0 0 0 3.08 50.92L288 305.12V416a32 32 0 0 0 64 0V288a32 32 0 0 0-14.25-26.62l-41.36-27.57 58.25-49.92zm116 39a128 128 0 1 0 128 128 128 128 0 0 0-128-128zm0 192a64 64 0 1 1 64-64 64 64 0 0 1-64 64zM128 256a128 128 0 1 0 128 128 128 128 0 0 0-128-128zm0 192a64 64 0 1 1 64-64 64 64 0 0 1-64 64z"></path></svg>)
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

    removeLastPoint(){
        if (this.state.pins.length >= 2){
            let pinCopy = this.state.pins.slice(0,-1);
            this.setState({ pins: pinCopy }, () => {
                this.state.polypath.setMap(null)
                this.state.directionsRenderer.setMap(null);
                this.calculateAndDisplayRoutes(this.map)
            });
            if (!this.state.on_road){
                this.reloadMap()
            }
        }
    }
    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={i}>{error}</li>
                ))}
            </ul>
        );
    }
    render(){   
        let pace
        if ((parseInt(this.state.duration) / 60) === 0){
            pace = '0.0'
        }else{
            let targetNum = parseFloat(this.state.distance) / (parseFloat(this.state.duration) / 60)
            pace = (Math.round(targetNum * 100) / 100).toFixed(1);
        }
        return(
            <div id="workoutform">
                <form onSubmit={(e)=>this.submitForm(e)} id='mapForm'>
                    <div id="mapInput">
                    {/* <label>Choose a route
                        <input type='text' onChange={this.update('route_id')} value={this.state.route_id}></input>
                    </label>
                    <br></br> */}
                    <br></br>
                    <h1 id="routeHeader">Route Form</h1>
                    <br></br>
                    <div id="workoutErrors">{this.renderErrors()}</div>
                    <input placeholder="Workout Title" id="titleinput" type='text' onChange={this.update('title')} value={this.state.title}></input>
                    <br></br>
                    <textarea id="workoutFormDesc" onChange={this.update('description')} value={this.state.description} placeholder="Workout Description"></textarea>

                    <br></br>
                    <select id="workoutSelect" onChange={this.updateWorkoutType} value={this.state.workout_type}>
                        <option value="run">Run</option>
                        {/* <option value="swim">Swim</option> */}
                        <option value="cycling">Cycling</option>
                    </select>
                    {/* <button type='button' onClick={this.update('workout_type') value='cycling'}>Cycling</button> */}
                    {/* <label>Elevation Change
                        <input type='text' onChange={this.update('elevation_change')} value={this.state.elevation_change}></input>
                    </label>
                    <br></br> */}
                    {/* <label>Distance
                        <input type='text' onChange={this.update('distance')} value={this.state.distance}></input>
                    </label> */}
                    {/* <button id="changeRoads" type='button'  onClick={() => this.changeRoads()}>Change Roads</button> */}
                    <button id="submitWorkout" value='submit'>Submit Route</button>
                    <button id='loop' type='button' onClick={() => this.loopRoute()}>Loop Route</button>
                    <button id='removePoint' type='button' onClick={() => this.removeLastPoint()}>Remove Last Point</button>
                    </div>
                    <div id='map'>
                        MAP
                    </div>
                </form>

                <div id="bottombar">
                    <div id='activityIcon'>{this.activityIcon(this.state.workout_type)}</div>
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