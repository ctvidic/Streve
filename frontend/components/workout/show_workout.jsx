import React from 'react';


class ShowWorkout extends React.Component{
    constructor(props){
        super(props)
        this.state = this.props.workout
    }
    componentDidMount() {
        this.props.fetchWorkouts()
    }

    render(){
        return(<div>
            <li>Route Id:{this.state.route_id} </li>
            <li>Type:{this.state.workout_type}</li>
            <li>Duration:{this.state.duration} </li>
            <li>Elevation Change:{this.state.elevation_change} </li>
            <li>Distance:{this.state.distance} </li>
            </div>)
    }
}

export default ShowWorkout