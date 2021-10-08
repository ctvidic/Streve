import React from 'react';
import { Link } from 'react-router-dom';


class Explore extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.clicked) {
            return (<div id="exploreTitle"><div ><h1>Explore</h1></div>
                <ul id="CreateDropdownExplore">
                    <li><Link to='/dashboard' id="workoutlink">Dashboard</Link></li>
                    <li><Link to='/workouts' id="activitylink">Workouts</Link></li>
                </ul></div>)
        }
        else {
            return (<div id="exploreTitle"><h1>Explore</h1></div>)
        }
    }
}

export default Explore