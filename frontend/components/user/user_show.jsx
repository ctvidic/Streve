import React from 'react';

import { NavLink } from 'react-router-dom'

class UserShow extends React.Component{
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.props.fetchWorkouts()
        this.props.fetchUser(this.props.userId)
    }

    handleSubmit(){

    }

    createWorkout(){
        <Redirect to="/dashboard" />
        // this.props.history.push('/api/workouts/new')
    }
    render() {
        return (
        <div>
        <div id='mainfeed'>
        <div id="profPhoto"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-circle" class="svg-inline--fa fa-user-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg></div>
        <div id="profusername">{this.props.user.username}</div>
        <div id="bottomScroll">

        <div id="biglinks">{this.props.workouts.map(workout=>(
        <div id="smallWorkout">
        <h1 id="workoutCreator">{this.props.user.username}</h1>
        <h1 id="smallWorkoutcreatedAt">{workout.created_at}</h1>
        <br></br>
        <h1 id="smallworkouttitle">{workout.title}</h1>
        <div id="staticMapImage">
                <img id="static-map"
                    src={`https://maps.googleapis.com/maps/api/staticmap?size=700x400&path=weight:3%7Ccolor:0xfc5200FF%7Cenc:${workout.static_map}&key=${window.googleAPIKey}&map_id=2ce121783e577f4a`} />
        </div>
        <NavLink to={`/workouts/${workout.id}`}><li key={workout.id}>Id: {workout.id} Type: {workout.workout_type}</li></NavLink></div>))}
        <NavLink to="/workouts/new"> Create New Workout </NavLink>
        </div>
        <div id="stats">
            <h1>User Stats</h1>
        </div>
        </div>
        </div>
        </div>
        )
    }
}


export default UserShow