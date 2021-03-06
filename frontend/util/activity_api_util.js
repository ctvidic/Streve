export const fetchActivities = () => (
    $.ajax({
        method: 'GET',
        url: `api/activities`
        // error: (err) => console.log(err)
    })
);

export const fetchActivity = id => (
    $.ajax({
        method: 'GET',
        url: `api/activities/${id}`
    })
);

export const createActivity = activity => (
    $.ajax({
        method: 'POST',
        url: 'api/activities',
        data: { activity }
    })
);

export const deleteActivity = activity =>{
    return(
    $.ajax({
        method: 'delete',
        url: `api/activities/${activity}`,
    })
)}