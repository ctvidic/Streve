# Streve
### Overview

Streve is a clone of the popular fitness application [Strava](https://www.strava.com/). Streve allows users to create, customize, and share their own running/cycling workouts. Relevant distance, pace, and elevation data is calculated based off activity. Users can interact with workouts and activities created by other users. Streve was designed to as closely resemble Strava as possible in web format.

### Technical Details

Streve makes use of a Ruby on Rails backend and a React/Redux + Javascript frontend. HTML/CSS used for styling. 
To calculate and display workouts four APIs were utilized:
- Google Maps API
- Google Directions API 
- Google Static Maps API
- Google Maps Elevation API 

#### Page Overview

1. Dashboard Page:
    The dashboard page displays a feed of all activities created by users on the website. Activities show relevant information like speed, distance, duration, while also displaying a small static map of the workout. Users can navigate to others users page's through the dashboard, and can also view relevant information about their own workout trends (activities in past week).
    <img width="1359" alt="Screen Shot 2021-09-18 at 10 59 26 AM" src="https://user-images.githubusercontent.com/80602202/133893211-93801295-544c-400e-9a22-91e7a94a8b16.png">


2. User Page:
    A user page shows users there own activities, as well as general info about their account. A user page aggregates relevant duration, distance, and elevation data for presentation to the user.

3. Workout Create/Edit/Delete Page:
    Workouts can be created and edited through google maps API based editor. Users place down markers which will then trigger the code to calculate the best route as well as relevant elevation data. On submission the route will be saved to the database as string of coordinates and elevation points. Workouts can also be edited and deleted through this same system.
    ![image](https://user-images.githubusercontent.com/80602202/133892910-b37e8181-4bc4-4777-ad3f-6ed6a135fc01.png)

4. Activity Create:
    On the activity create page a user can choose their workout as well as the duration for their own activity. This submitted activity will be whats displayed on the dashboard page and the user show page. 

5. Workout Show:
    The workout show page displays a large map of the specific workout as well relevant data. Below the map an elevation profile is create through Google Charts that displays an accurate depiction of elevation points along the route.
    ![image](https://user-images.githubusercontent.com/80602202/133893018-f6a71162-5afd-4d49-8eb0-357d50996147.png)


#### Challenges

1. Exporting/Importing Coordinates:
    Coordinates to be utilized by the google maps directions renderer have to be provided latitude and longitude. Ideally an array data type would be utilized to store this info. Unfortunately array data types dont work on all databases and are generally a no-no, so instead I mapped out the elevation coordinates into an easily split singluar text data type. Each coordinate is split by an 'X' which makes it easy to package and unpackage on the show/edit page.
    
2. Elevation Values:
    Google maps calculates elevation by selecting evenly spaced points along a line. Unfortunately in this project the line was dynamic and followed roads. To create an accurate elevation data set, up to 256 points are selected along the directions renderer response. If more than 256 points are present along the line, the difference was then randomly disposed of from the array. Although this creates less accurate data, this led to less storage constraints and a quicker response time.

#### Future Work

1. Off-Road Capability
    The real Strava is not confined to solely following roads or set paths. Due to time constraints this project not could fully incorporate Google Maps Polylines feature to fully enable off-road workouts. This would be a great addition in the future to allow for off-road activities.
    
#### Also...
- Strava means 'strive' in Swedish. Streve means 'strive' in Norwegian.


