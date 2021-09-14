export const fetchWorkouts = ()=> (
    $.ajax({
        method: 'GET',
        url: `api/workouts`
        // error: (err) => console.log(err)
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
        url: 'api/workouts',
        data: { workout }
    })
);

export const deleteWorkout = workout => (
    $.ajax({
        method: 'delete',
        url: `api/workouts/${workout.id}`,
    })
);

export const editWorkout = workout => (
    $.ajax({
        method: 'patch',
        url: `/api/workouts/${workout.id}`,
        data:{ workout }
    })
);


