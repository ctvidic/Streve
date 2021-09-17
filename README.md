# Streve
### Overview

Streve is a clone of the popular fitness application [Strava](https://www.strava.com/). Streve allows users to create, customize, and share their own running/cycling workouts. Relevant distance, pace, and elevation data is calculated based off activity. Users can interact with workouts and activities created by other users. Streve was designed to as closely resemble Strava as possible in web format.

### Technical Details

Streve makes use of a Ruby on Rails backend, and a React/Redux + Javascript frontend. HTML/CSS used for styling. 
To calculate and display workouts four APIs were utilized:
- Google Maps API
- Google Directions API 
- Google Static Maps API
- Google Maps Elevation API 

#### Page Overview

1. Dashboard Page
    The dashboard page displays a feed of all activities created by users on the website. Activities show relevant information like speed, distance, duration, while also displaying a small static map of the workout. Users can navigate to others users page's through the dashboard, and can also view relevant information about their own workout trends (activities in past week).

2. User Page
    A user page shows users there own activities, as well as general info about their account. A user page aggregates relevant duration, distance, and elevation data for presentation to the user.

3. Workout Create/Edit/Delete Page
    Workouts can be created and edited through google maps API based editor. Users place down markers which will then trigger the code to calculate the best route as well as relevant elevation data. On submission the route will be saved to the database as string of coordinates and elevation points. Workouts can also be edited and deleted through this same system.

4. Activitiy Create
    On the activity create page a user can choose their workout as well as the duration for their own activity. This submitted activity will be whats displayed on the dashboard page and the user show page. 

5. Workout Show
    The workout show page displays a large map of the specific workout as well relevant data. Below the map an elevation profile is create through Google Charts that displays an accurate depiction of elevation points along the route.

