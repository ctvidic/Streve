export const fetchWorkouts = ()=> (
    $.ajax({
        method: 'GET',
        url: `api/workouts`,
        error: (err) => console.log(err)
    })
);

export const fetchWorkout = id => (
    $.ajax({
        method: 'GET',
        url: `api/workouts/${id}`
    })
);

export const createWorkout = workout => (
    $.ajax({
        method: 'POST',
        url: 'api/workout',
        data: { workout }
    })
);

