import React from 'react';

import { NavLink } from 'react-router-dom'

class UserShow extends React.Component{
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.props.fetchWorkouts()
    }

    handleSubmit(){

    }

    createWorkout(){
        <Redirect to="/dashboard" />
        // this.props.history.push('/api/workouts/new')
    }
    render() {
        return (
        <div>{this.props.workouts.map(workout=>(
        <NavLink to={{
            pathname:`/workouts/${workout.id}`
            }}><li key={workout.id}>Id: {workout.id} Type: {workout.workout_type}</li></NavLink>))}
        <NavLink to="/workouts/new"> Create New Workout </NavLink>
        </div>
        
        )
    }
}


export default UserShow