import React from 'react';



class WorkoutForm extends React.Component{
    constructor(props){
        super(props)
        this.state = this.props.workout
    }
    submitForm(){
        this.props.createWorkout(this.state).then(() => {
          this.props.history.push(`../users/${this.props.user_id}`)
        })
    }

    update(text) {
        return e => this.setState({ [text]: e.currentTarget.value })
    }

    render(){
        const workout = { user_id: 17, route_id: 2, workout_type: 'run', duration: 200, elevation_change: 200, distance: 200 }
        return(
            <div>
                <h1>New Workout Form</h1>
                <form onSubmit={()=>this.submitForm()}>
                    <label>Choose a route
                        <input type='text' onChange={this.update('route_id')} value={this.state.route_id}></input>
                    </label>
                    <br></br>
                    <label>Workout Type
                    <select onChange={this.update('workout_type')}>
                        <option value="run">Run</option>
                        <option value="swim">Swim</option>
                        <option value="cycling">Cycling</option>
                    </select>
                    </label>
                    <br></br>
                    <label>Duration
                    <input type='text' onChange={this.update('duration')} value={this.state.duration}></input>
                    </label>
                    <br></br>
                    <label>Elevation Change
                        <input type='text' onChange={this.update('elevation_change')} value={this.state.elevation_change}></input>
                    </label>
                    <br></br>
                    <label>Distance
                        <input type='text' onChange={this.update('distance')} value={this.state.distance}></input>
                    </label>
                    <br></br>
                    <button value='submit'>Submit</button>
                </form>
            </div>
        )
    }
}


export default WorkoutForm