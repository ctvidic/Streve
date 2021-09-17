import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import Chart from "react-google-charts";



class Dashboard extends React.Component{
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        this.props.fetchWorkouts().then(() => this.props.fetchUsers().then(() => { this.props.fetchActivities() }))
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



    activities(activities){
        let actArr = [['S',0],['M',0],['T',0],['W',0],['T',0],['F',0],['S',0]]
        let day = new Date();
        let daynumber = day.getDay();
        if (this.props.activities.length !== 0) {
            for (let i = 0; i < this.props.activities.length; i++) {
                if (this.props.activities[i].user_id === this.props.currentUser.id) {
                    let activityDate = new Date(this.props.activities[i].date)
                    if (activityDate.getDay() <= daynumber){
                        actArr[activityDate.getDay()+1][1]+=1
                    }
                }
            }
        }
        return actArr
    }

    activityImage(type){
        if (type === 'cycling'){
            return <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="biking" class="svg-inline--fa fa-biking fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M400 96a48 48 0 1 0-48-48 48 48 0 0 0 48 48zm-4 121a31.9 31.9 0 0 0 20 7h64a32 32 0 0 0 0-64h-52.78L356 103a31.94 31.94 0 0 0-40.81.68l-112 96a32 32 0 0 0 3.08 50.92L288 305.12V416a32 32 0 0 0 64 0V288a32 32 0 0 0-14.25-26.62l-41.36-27.57 58.25-49.92zm116 39a128 128 0 1 0 128 128 128 128 0 0 0-128-128zm0 192a64 64 0 1 1 64-64 64 64 0 0 1-64 64zM128 256a128 128 0 1 0 128 128 128 128 0 0 0-128-128zm0 192a64 64 0 1 1 64-64 64 64 0 0 1-64 64z"></path></svg>
        }else{
            return <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="running" class="svg-inline--fa fa-running fa-w-13" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 416 512"><path fill="currentColor" d="M272 96c26.51 0 48-21.49 48-48S298.51 0 272 0s-48 21.49-48 48 21.49 48 48 48zM113.69 317.47l-14.8 34.52H32c-17.67 0-32 14.33-32 32s14.33 32 32 32h77.45c19.25 0 36.58-11.44 44.11-29.09l8.79-20.52-10.67-6.3c-17.32-10.23-30.06-25.37-37.99-42.61zM384 223.99h-44.03l-26.06-53.25c-12.5-25.55-35.45-44.23-61.78-50.94l-71.08-21.14c-28.3-6.8-57.77-.55-80.84 17.14l-39.67 30.41c-14.03 10.75-16.69 30.83-5.92 44.86s30.84 16.66 44.86 5.92l39.69-30.41c7.67-5.89 17.44-8 25.27-6.14l14.7 4.37-37.46 87.39c-12.62 29.48-1.31 64.01 26.3 80.31l84.98 50.17-27.47 87.73c-5.28 16.86 4.11 34.81 20.97 40.09 3.19 1 6.41 1.48 9.58 1.48 13.61 0 26.23-8.77 30.52-22.45l31.64-101.06c5.91-20.77-2.89-43.08-21.64-54.39l-61.24-36.14 31.31-78.28 20.27 41.43c8 16.34 24.92 26.89 43.11 26.89H384c17.67 0 32-14.33 32-32s-14.33-31.99-32-31.99z"></path></svg>
        }
    }
    render(){
        if (this.props.activities !== undefined && this.props.workouts !== undefined && this.props.users !== undefined){
        let latestActivity = [{title: '', id: ''}]
        if (this.props.activities.length !== 0){
            for (let i = 0; this.props.activities.length;i++){
                if (this.props.activities[i].user_id === this.props.currentUser.id){
                    latestActivity = this.props.activities[i];
                    break;
                }
            }
        }
        let randUsers = []
        for(let i=0; i<3;i++){
        
            let length = this.props.usersArray.length
            randUsers.push(this.props.usersArray[Math.floor(Math.random() * length)])
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
                        <div><Link to={`/workouts/${latestActivity.workout_id}`}>{latestActivity.title} - {latestActivity.date}</Link></div>
                    </div>
                    
                </div> 
                <div id="dayofweekchart">
                    <h1>Your Activities This Week</h1>
                    <Chart
                        // width={'500px'}
                        // height={'300px'}
                        chartType="Bar"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['', 'Entries'],
                            this.activities(this.props.activities)[0],
                            this.activities(this.props.activities)[1],
                            this.activities(this.props.activities)[2],
                            this.activities(this.props.activities)[3],
                            this.activities(this.props.activities)[4],
                            this.activities(this.props.activities)[5],
                            this.activities(this.props.activities)[6]
                        ]}
                        options={{
                            legend: {position: 'none'},
                            
                        }}
                        // For tests
                       
                    />
                </div>
               
            </div>
            <div id="userFeed">
                {this.props.activities.map(activity => (
                    <div id="smallWorkout">

                        <div id='topStats'>
                            <div id='topStatsProf'>
                                
                            <div id='littleProf'>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-circle" class="svg-inline--fa fa-user-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>
                            <div>
                            <h1 id="workoutCreator"><NavLink to={`/users/${activity.user_id}`}>{this.username(activity)}</NavLink></h1>
                            <h1 id="smallWorkoutcreatedAt">{activity.date}</h1>
                            </div>
                            </div>
                            {this.activityImage(this.props.workouts[activity.workout_id].workout_type)}
                            </div>
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
            <div id="infoPics">
                <div id="workoutGraphic">
                <img src="https://d3nn82uaxijpm6.cloudfront.net/assets/application/dashboard/sidebar-badge-challenges-9908f45d44160c600a4f9d788795b180a74001daae32461705f5f57d90a7c651.png"></img>
                <div id= "workoutGraphicinfo">
                    <h1>Workouts</h1>
                    <div>Create a workout and see your route. Workouts can display relevant elevation, distance, and map info. Workouts contain full CRUD functionality.</div>
                </div>
                </div>
                <div id="routesGraphic">
                    <img src="https://d3nn82uaxijpm6.cloudfront.net/assets/application/dashboard/sidebar-badge-clubs-dda5c075f23e3f2ced7d0e4b2afb87df988978962b6de33c7a232be53b6a75ca.png"></img>
                    <div id="routesGraphicinfo">
                        <h1>Activities</h1>
                        <div>Create an actitivity and link it to a Workout. Activities display relevant pace and sync to your account and dashboard.</div>
                    </div>
                </div>
                <div id="usersGraphic">
                    <img src="https://dorado.strava.com/images/z1_badge_tailwind.png"></img>
                    <div id="usersGraphicinfo">
                        <h1>Feed</h1>
                        <div>Users dashboard and user page show user distance, pace, duration, and elevation stats. See how you stack up.</div>
                    </div>
                </div>
                <div id="suggestedFriends">
                    <h1>Suggested Users</h1>
                    {randUsers.map(prof => (
                    <div id="suggestedProf">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-circle" class="svg-inline--fa fa-user-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>
                        <Link to={`/users/${prof.id}`}>{prof.username}</Link>
                    </div>
                    ))}

                </div>
            </div>
       
        </div>)
    }else{
        return(<div>Loading...</div>)
    }
    }


}

export default Dashboard    