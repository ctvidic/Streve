import React from 'react';


class WorkoutForm extends React.Component{
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
        this.props.fetchWorkouts(this.props.sessionId)
    }
    render(){   
        return(<div>yeeeeeeeee</div>)
    }
}


export default WorkoutForm