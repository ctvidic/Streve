import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'



class Dashboard extends React.Component{
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        this.props.fetchWorkouts().then((workouts) => { this.props.fetchActivities() })
        this.props.fetchUsers()
    }

    pace(distance, workout_type, duration) {
        let mimin
        mimin = duration / distance;
        let secs = parseInt(mimin % 1 * 60)
        let mins = (mimin - mimin % 1)
        if (mins < 10) {
            mins = `0${mins}`
        } else {
            mins = `${mins}`
        }
        if (secs < 10) {
            secs = `0${secs}`
        } else {
            secs = `${secs}`
        }
        if (workout_type === 'run') {
            return `${mins}:${secs} min/mi`
        } else {
            return `${parseInt(60 * distance / duration)} mph`
        }
    }

    username(activity){
        if (this.props.users[activity.user_id]){
        return (
            <div>{this.props.users[activity.user_id].username}</div>)
        }else{
            return(
                <div>User DNE</div>
            )
        }
    }

    distance(distance){
        if (distance){
            return distance.distance
        }else{
            return ""
        }
    }
    render(){
        let latestActivity = [{title: '', id: ''}]
        if (this.props.activities.length !== 0){
            latestActivity = this.props.activities[0]
        }
        return(<div id="dashboardContainer">
            <div id="userProf">
                <div id ="profPhotoDashboard">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-circle" class="svg-inline--fa fa-user-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>
                </div>
                <div id ="profBox">
                    <Link to={`/users/${parseInt(this.props.currentUser.id)}`}>{this.props.currentUser.username}</Link>
                    <div id="latestActivity">
                        <h1>Latest Activity</h1>
                        <div><Link to={`/workouts/${latestActivity.workout_id}`}>{latestActivity.title} - {latestActivity.created_at}</Link></div>
                    </div>
                </div>   
            </div>
            <div id="userFeed">
                {this.props.activities.map(activity => (
                    <div id="smallWorkout">

                        <div id='topStats'>

                            <h1 id="workoutCreator"><NavLink to={`/users/${activity.user_id}`}>{this.username(activity)}</NavLink></h1>
                            <h1 id="smallWorkoutcreatedAt">{activity.created_at}</h1>
                            <h1 id="smallworkouttitle"><NavLink to={`/workouts/${activity.workout_id}`}>{activity.title}</NavLink>
                                </h1>

                            <div id="activityStats">
                                <div id="distanceStat">
                                    <div id="distanceStatText">Distance: </div>
                                    <div id="distanceValueStat">{this.distance(this.props.workouts[activity.workout_id])} mi</div>
                                </div>
                                <div id="paceStat">
                                    <div id="paceStatText">Pace: </div>
                                    <div id="paceValueStat">{this.pace(this.distance(this.props.workouts[activity.workout_id]), this.props.workouts[activity.workout_id].workout_type, activity.duration)}</div>
                                </div>
                                <div id="durationStat">
                                    <div id="durationStatText">Duration: </div>
                                    <div id="durationValueStat">{activity.duration} mins</div>
                                </div>
                            </div>
                        </div>
                        <div id="staticMapImage">
                            <img id="static-map"
                                src={`https://maps.googleapis.com/maps/api/staticmap?size=1200x400&path=weight:3%7Ccolor:0xfc5200FF%7Cenc:${this.props.workouts[activity.workout_id].static_map}&key=${window.googleAPIKey}&map_id=2ce121783e577f4a`} />
                        </div>
                    </div>))}
            </div>
     
        </div>)
    }


}

export default Dashboard    