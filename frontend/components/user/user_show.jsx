import React from 'react';

import { NavLink } from 'react-router-dom'
var USERPIC = {
    'newuser': 'https://64.media.tumblr.com/17365056e618e2cdadf7859fd71b3bf4/tumblr_ntaxyxueNm1ue88ggo3_250.jpg',
    'chrisV': 'https://avatars.githubusercontent.com/u/80602202?v=4',
    'notChrisV': 'https://i.redd.it/xh4xvvx22yt41.jpg'
}

class UserShow extends React.Component{
    constructor(props) {
        super(props);
        this.removeActivity = this.removeActivity.bind(this)

    }
    componentDidMount() {
        this.props.fetchWorkouts().then(() => this.props.fetchUser(this.props.userId).then(() => { this.props.fetchActivities() }))

    }

    handleSubmit(){

    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.type !== this.props.match.params.type) {
            this.forceUpdate();
        }
    }
    createWorkout(){
        <Redirect to="/dashboard" />
    }

    pace(distance,workout_type,duration){
        let mimin
        mimin = duration/distance;
        let secs = parseInt(mimin % 1 * 60)
        let mins = (mimin - mimin % 1)
        if (mins < 10){
            mins =  `0${mins}`
        }else{
            mins = `${mins}`
        }
        if (secs < 10){
            secs = `0${secs}`
        } else {
            secs = `${secs}`
        }
        if (workout_type === 'run'){
            return `${mins}:${secs} min/mi`
        }else{
            return `${parseInt(60*distance/duration)} mph`
        }
    }

    removeActivity(activity){
        if (activity.user_id === this.props.sessionId) {
            return (<button onClick={() => this.props.deleteActivity(activity).then(() => window.location.reload())}>Remove Activity</button>)
        }
    }

    activityChart(){
        let totalTime = 0
        let totalElev = 0
        let totalDist = 0
        for(let i=0;i<this.props.activities.length;i++){
            if (this.props.workouts[this.props.activities[i].workout_id] !== undefined){
            totalTime += this.props.activities[i].duration
            totalElev += this.props.workouts[this.props.activities[i].workout_id].elevation_change
            totalDist += this.props.workouts[this.props.activities[i].workout_id].distance
            }
        }
        if (totalTime > 59){
            let hrs = parseInt(totalTime / 60)
            let mins = parseInt(totalTime % 60)
            if (hrs > 1){
                totalTime = `${hrs} hrs ${mins} mins`
            }else{
                totalTime = `${hrs} hr ${mins} mins`
            }
        }else{
            totalTime = `${totalTime} mins`
        }

        return(
            <div id="sidebarStats">
                <div id='totalActivities'><div id="bigNumber">{this.props.activities.length}</div>
                <div>Total Activities</div></div>
                <div id="totaltimeStat">Activity Time: {totalTime}</div>
                <div id="totalelevationStat">Elevation Gained: {totalElev} m</div>
                <div id="totaldistanceStat">Distance: {totalDist} mi</div>
            </div>
        )
    }

    findWorkout(id){
        if (this.props.workouts[id] !== undefined){
            return this.props.workouts[id]
        }else{
            return {
                distance: 1,
                workout_type: 'run',
                elevation_change: 2,
                static_map: 'Loading'
            }
        }
        
    }
    activityImage(type) {
        if (type === 'cycling') {
            return <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="biking" class="svg-inline--fa fa-biking fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M400 96a48 48 0 1 0-48-48 48 48 0 0 0 48 48zm-4 121a31.9 31.9 0 0 0 20 7h64a32 32 0 0 0 0-64h-52.78L356 103a31.94 31.94 0 0 0-40.81.68l-112 96a32 32 0 0 0 3.08 50.92L288 305.12V416a32 32 0 0 0 64 0V288a32 32 0 0 0-14.25-26.62l-41.36-27.57 58.25-49.92zm116 39a128 128 0 1 0 128 128 128 128 0 0 0-128-128zm0 192a64 64 0 1 1 64-64 64 64 0 0 1-64 64zM128 256a128 128 0 1 0 128 128 128 128 0 0 0-128-128zm0 192a64 64 0 1 1 64-64 64 64 0 0 1-64 64z"></path></svg>
        } else {
            return <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="running" class="svg-inline--fa fa-running fa-w-13" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 416 512"><path fill="currentColor" d="M272 96c26.51 0 48-21.49 48-48S298.51 0 272 0s-48 21.49-48 48 21.49 48 48 48zM113.69 317.47l-14.8 34.52H32c-17.67 0-32 14.33-32 32s14.33 32 32 32h77.45c19.25 0 36.58-11.44 44.11-29.09l8.79-20.52-10.67-6.3c-17.32-10.23-30.06-25.37-37.99-42.61zM384 223.99h-44.03l-26.06-53.25c-12.5-25.55-35.45-44.23-61.78-50.94l-71.08-21.14c-28.3-6.8-57.77-.55-80.84 17.14l-39.67 30.41c-14.03 10.75-16.69 30.83-5.92 44.86s30.84 16.66 44.86 5.92l39.69-30.41c7.67-5.89 17.44-8 25.27-6.14l14.7 4.37-37.46 87.39c-12.62 29.48-1.31 64.01 26.3 80.31l84.98 50.17-27.47 87.73c-5.28 16.86 4.11 34.81 20.97 40.09 3.19 1 6.41 1.48 9.58 1.48 13.61 0 26.23-8.77 30.52-22.45l31.64-101.06c5.91-20.77-2.89-43.08-21.64-54.39l-61.24-36.14 31.31-78.28 20.27 41.43c8 16.34 24.92 26.89 43.11 26.89H384c17.67 0 32-14.33 32-32s-14.33-31.99-32-31.99z"></path></svg>
        }
    }
    bigProf(username) {
        if (username) {
            if (USERPIC[username]) {
                return (<img id='avatarRealBig' src={USERPIC[username]} alt="Avatar" />)

            } else {
                return (
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-circle" class="svg-inline--fa fa-user-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>
                )
            }
        }
    }
    littleProf(username) {
        if (username) {
            if (USERPIC[username]) {
                return (<img id='avatar' src={USERPIC[username]} alt="Avatar" />)

            } else {
                return (
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-circle" class="svg-inline--fa fa-user-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>
                )
            }
        }
    }
    render() {
        if (this.props.activities !== undefined && this.props.workouts !== undefined && this.props.user !== undefined) {
        return (
        <div>
        <div id='mainfeed'>
        <div id="profPhoto">
        {this.bigProf(this.props.user.username)}
        </div>
        <div id="profusername">{this.props.user.username}</div>
            
        <div id="bottomline"></div>
        <div id="bottomScroll">
        <div id="biglinks">{this.props.activities.map(activity=>(
        <div id="smallWorkout">
        
        <div id='topStats'>
        <div id='topStatsFlex'>
        <div id='topimage'>
        {this.littleProf(this.props.user.username)}
        <div>
        <h1 id="workoutCreator">{this.props.user.username}</h1>
        <h1 id="smallWorkoutcreatedAt">{activity.date}</h1>
        </div>
        
        </div>
                        <div id='topStatsTypeImage'>{this.activityImage(this.findWorkout(activity.workout_id).workout_type)}</div>

        </div>
        <h1 id="smallworkouttitle">{activity.title}
                        <div id="removeActivity">
                            {this.removeActivity(activity)}
                        </div></h1>
                   
        <div id="activityStats">
            <div id="distanceStat">
                <div id="distanceStatText">Distance: </div>
                <div id="distanceValueStat">{this.findWorkout(activity.workout_id).distance} mi</div>
            </div>
            <div id="paceStat">
                <div id="paceStatText">Pace: </div>
                            <div id="paceValueStat">{this.pace(this.findWorkout(activity.workout_id).distance, this.findWorkout(activity.workout_id).workout_type,activity.duration)}</div>
            </div>
            <div id="durationStat">
                <div id="durationStatText">Duration: </div>
                <div id="durationValueStat">{activity.duration} mins</div>
            </div>
        </div>
        </div>
        <NavLink to={`/workouts/${activity.workout_id}`}>
        <div id="staticMapImage">
                <img id="static-map"
                        src={`https://maps.googleapis.com/maps/api/staticmap?size=1200x400&path=weight:3%7Ccolor:0xfc5200FF%7Cenc:${this.findWorkout(activity.workout_id).static_map}&key=${window.googleAPIKey}&map_id=2ce121783e577f4a`} />
        </div>
        </NavLink>
        </div>))}
        </div>
        <div id="stats">
            <h1>User Stats</h1>
            <div>{this.activityChart()}</div>
        </div>
        </div>
        </div>
        </div>
        )}else{
            return(<div>Loading...</div>)
        }
        
    }

}


export default UserShow