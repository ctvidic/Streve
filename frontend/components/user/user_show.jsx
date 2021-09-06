
import React from 'react';

class UserShow extends React.Component{
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.props.fetchWorkouts()
    }

    handleSubmit(){

        
    }
    render() {
        return (
        <div>{this.props.workouts.map(workout=>(<li key={workout.id}>Id: {workout.id} Type: {workout.workout_type}</li>))}
        <form onSubmit={this.handleSubmit()}>
            
        </form>
        </div>
        
        )
    }
}


export default UserShow