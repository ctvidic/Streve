# Streve
### Overview

[Streve](https://streve.herokuapp.com/#/) is a clone of the popular fitness application [Strava](https://www.strava.com/). Streve allows users to create, customize, and share their own running/cycling workouts. Relevant distance, pace, and elevation data is calculated based off activity. Created workouts generate a GPX file that users can download and check out on other applications off site. Users can interact with workouts and activities created by other users. Streve was designed to as closely resemble Strava as possible in web format.

### Technical Details

Streve makes use of a Ruby on Rails backend and a React/Redux + Javascript frontend. CSS used for styling. 
To calculate and display workouts four APIs were utilized:
- Google Maps API
- Google Directions API 
- Google Static Maps API
- Google Maps Elevation API

Google Charts was utilized for visualization tools. GPS to GPX package used for converting to GPX file.

#### Page Overview

1. #### Dashboard Page:
    The dashboard page displays a feed of all activities created by users on the website. Activities show relevant information like speed, distance, duration, while also displaying a small static map of the workout. Users can navigate to others users page's through the dashboard, and can also view relevant information about their own workout trends (activities in past week).
    <br>
    <img width="1359" alt="Screen Shot 2021-09-18 at 10 59 26 AM" src="https://user-images.githubusercontent.com/80602202/133893211-93801295-544c-400e-9a22-91e7a94a8b16.png">
    <br>


2. #### User Page:
    A user page shows users there own activities, as well as general info about their account. A user page aggregates relevant duration, distance, and elevation data for presentation to the user.
    <br>
3. #### Workout Create/Edit/Delete Page:
    Workouts can be created and edited through google maps API based editor. Users place down markers which will then trigger the code to calculate the best route as well as relevant elevation data. On submission the route will be saved to the database as string of coordinates and elevation points. Workouts can also be edited and deleted through this same system.
    <br>
    ![image](https://user-images.githubusercontent.com/80602202/133892910-b37e8181-4bc4-4777-ad3f-6ed6a135fc01.png)
    <br>
4. #### Activity Create:
    On the activity create page a user can choose their workout as well as the duration for their own activity. This submitted activity will be whats displayed on the dashboard page and the user show page. 

5. #### Workout Show:
    The workout show page displays a large map of the specific workout as well relevant data. Users can edit/delete workouts on the workout page only if they are the creator of the workout. Below the map an elevation profile is create through Google Charts that displays an accurate depiction of elevation points along the route.
    ![image](https://user-images.githubusercontent.com/80602202/133893018-f6a71162-5afd-4d49-8eb0-357d50996147.png)
    <br>
    Users also can download the route as a GPX file. Try it out for yourself and upload it to Google Earth or a [GPX visualizer](https://www.gpsvisualizer.com/).

#### Challenges

1. #### Exporting/Importing Coordinates:
    Coordinates to be utilized by the google maps directions renderer have to be provided latitude and longitude. Ideally an array data type would be utilized to store this info. Unfortunately array data types dont work on all databases and are generally a no-no, so instead I mapped out the elevation coordinates into an easily split singular text data type. Each coordinate is split by an 'X' which makes it easy to package and unpackage on the show/edit page.
    
2. #### Elevation Values:
    Google maps calculates elevation by selecting evenly spaced points along a line. Unfortunately in this project the line was dynamic and followed roads. To create an accurate elevation data set, up to 256 points are selected along the directions renderer response. If more than 256 points are present along the line, the difference was then randomly disposed of from the array. Although this creates less accurate data, this led to less storage constraints and a quicker response time.

3. #### Exporting GPX:
    An GPS-to-GPX [package](https://www.npmjs.com/package/gps-to-gpx) was utilized to convert outputted google location data in the direction renderer to specific latitude longitude coordinates that could be downloaded and visualized off site. Nested for loops were used to accomplish this by analyzing each direction renderer segment and each lat/lng within them. 

#### Future Work

1. Off-Road Capability
    The real Strava is not confined to solely following roads or set paths. Due to time constraints this project not could fully incorporate Google Maps Polylines feature to fully enable off-road workouts. This would be a great addition in the future to allow for off-road activities.
    
#### Also...
- Strava means 'strive' in Swedish. Streve means 'strive' in Norwegian.


