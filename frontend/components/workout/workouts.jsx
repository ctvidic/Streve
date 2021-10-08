import React from 'react';
import { Link } from 'react-router-dom';



class Workouts extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.fetchWorkouts();
    }
    render(){
        debugger;
        return(<div id="workoutsPage">
            <h1 id="workoutsHeader">Workouts</h1>
            <div id="workoutsMatrix">
            {this.props.workoutsArray.map((workout) => (
                <Link to={`workouts/${workout.id}`} style={{ textDecoration: 'none', color: 'black'}}>
                <div id="workoutsCard">
                    <div id="workoutsCardTopText">
                    <h1>{workout.title}</h1>
                    <h1>{workout.distance} mi</h1>
                    </div>
                    <img id="static-map-workouts"
                        src={`https://maps.googleapis.com/maps/api/staticmap?size=250x200&path=weight:3%7Ccolor:0xfc5200FF%7Cenc:${workout.static_map}&key=${window.googleAPIKey}&map_id=2ce121783e577f4a`} />
                    </div></Link>)
            )}
            </div>
            </div>)
    }
}

export default Workouts