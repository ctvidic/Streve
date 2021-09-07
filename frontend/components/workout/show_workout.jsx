import React from 'react';
import { NavLink } from 'react-router-dom'


class ShowWorkout extends React.Component{
    constructor(props){
        super(props)
        // this.state = this.props.workout
    }
    componentDidMount() {
        this.props.fetchWorkouts()
    }

    // componentDidUpdate(){
    //     if (!this.props.workout){
    //         this.props.fetchWorkouts()
    //     }
    // }

    render() {
        return(<div>
            <li>Route Id:{this.props.workout.route_id} </li>
            <li>Type:{this.props.workout.workout_type}</li>
            <li>Duration:{this.props.workout.duration} </li>
            <li>Elevation Change:{this.props.workout.elevation_change} </li>
            <li>Distance:{this.props.workout.distance} </li>
            <NavLink to={`/users/${this.props.sessionId}`} 
                onClick={() => this.props.removeWorkout(this.props.workout)}>Remove Workout</NavLink>
            </div>)
    }
}

export default ShowWorkout