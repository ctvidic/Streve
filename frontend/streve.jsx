import React from "react";

import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from "./components/root";
import {fetchWorkouts} from "./actions/workout_actions"

document.addEventListener("DOMContentLoaded", () => {
    let store;

    if (window.currentUser) {
        const preloadedState = {
            session: { id: window.currentUser.id },
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    window.dispatch = store.dispatch;
    window.getState = store.dispatch;
    window.fetchWorkouts = fetchWorkouts;
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store} />, root);
});