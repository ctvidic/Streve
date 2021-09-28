import React from 'react';


class ActivityForm extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            workout_type: 'run',
            route_id: '',
            duration: '',
            title: '',
            description: '',
            date: ''
        }
        this.updateWorkoutType = this.updateWorkoutType.bind(this)
        // this.updateRoute = this.updateRoute(this)
    }

    componentDidMount(){
        this.props.fetchWorkouts()
    }

    componentWillUnmount() {
        debugger;
        this.props.clearErrors();
    }

    update(text) {
        return e => {
            this.setState({ [text]: e.currentTarget.value })
        }
    }
    updateWorkoutType(e) {
        const input = e.target.value;
        this.setState({ workout_type: input })
    }

    updateRoute(workout){
        if (this.state.route_id !== workout.id){
        this.setState({route_id: workout.id })
        }else{
            this.setState({ route_id: ''})
        }
    }

    updateRouteShow(workout){
        if (workout.id !== this.state.route_id){
            return (
                <div id="workoutPopTitle">{workout.title}</div>
            )
        }else{
            return (
                <div id="selectedRoute"><div id="leftsideShowBox"><h1 id="titleActivityPop">{workout.title}</h1><h1 id="descriptionActivityPop">{workout.description}</h1></div>
                    <div id="staticMapImageActivity">
                        <img id="static-mapActivity"
                            src={`https://maps.googleapis.com/maps/api/staticmap?size=1000x1000&path=weight:3%7Ccolor:0xfc5200FF%7Cenc:${workout.static_map}&key=${window.googleAPIKey}&map_id=2ce121783e577f4a`} />
                    </div>
                </div>
            )
        }
        
    }
    
    submitForm(e){
        e.preventDefault();
        if (parseInt(this.state.duration) < 1){
            this.setState({duration: 1})
        }
        let submit = {
            description: this.state.description,
            duration: parseInt(this.state.duration),
            title: this.state.title,
            workout_id: parseInt(this.state.route_id),
            user_id : this.props.userId,
            date: this.state.date
        }
        this.props.createActivity(submit).then(() => {
            this.props.history.push(`../users/${this.props.userId}`)
        })
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
        let updatedWorkouts = this.props.workouts.filter(workout => 
            (workout.workout_type === this.state.workout_type)
        )
        return(<div id="activityFormDiv"><div id="innerActivityFormDiv"><h1 id="entryheader">Activity Entry</h1>
            <form id="activityForm" onSubmit={(e) => this.submitForm(e)}>   
                <div id="leftsideActivity">
                <div id="activityErrors">{this.renderErrors()}</div>
                <div id="durationActivity">
                <div>Duration (mins)</div><input type='number' value={this.state.duration} onChange={this.update('duration')}></input>
                </div>
                <div id="titleActivity"><div>Title</div><input type='text' onChange={this.update('title')} value={this.state.title}></input></div>
                <div id="descriptionActivity">
                <div>Description</div><textarea type='text' onChange={this.update('description')} value={this.state.description}></textarea></div>
                <div id="dateActivity">
                <div>Date</div><input type='date' onChange={this.update('date')} value={this.state.date}></input></div>
                <select id="activitySelectType" onChange={this.updateWorkoutType} value={this.state.workout_type}>
                    <option value="run">Run</option>
                    {/* <option value="swim">Swim</option> */}
                    <option value="cycling">Cycling</option>
                </select>
                <button id="submitActivity" value='submit'>Submit Activity</button>

                </div>
                <div id="rightsideActivity">
                <h1 id="workoutListTitle">Workouts</h1>
                <ul>
                    {updatedWorkouts.map(workout => (
                        <div id="workoutItem" onClick={() => this.updateRoute(workout)}>{this.updateRouteShow(workout)}</div>
                    ))}
                </ul>
                </div>
        </form>
        </div>
        </div>)
    }
}

export default ActivityForm