# Homework 5 – Angular Services and Routing
This homework includes two Angular projects demonstrating key concepts of Angular services and Angular routing. Each part builds on practical applications that fetch external data and handle dynamic navigation between views.

## Part 1 – Map Directions with Angular Services
### Overview
This Angular application uses the MapQuest API to fetch and display turn-by-turn directions between two locations. It demonstrates how to use Angular services to fetch remote data and bind it to the UI.

### Features
- Uses the MapQuest API to fetch route data in JSON format

### Displays:

- Total distance

- Total formatted time

- Turn-by-turn narratives and step distances in a table

- When a step is selected, displays additional data for that maneuver

- Directions update automatically when the "From" or "To" fields are modified


## Setup Instructions
- Sign up at MapQuest Developer to get a free API key.

- Insert your API key into the appropriate service file (e.g., mapquest.service.ts).

- Run the Angular app:

npm install
ng serve
Open in browser: [http://localhost:4200](http://localhost:4200)

## Part 2 – Angular Contact Manager with Routing 📇
### Overview
This application uses Angular Routing to manage a contact list. It includes routes for adding, editing, deleting, and viewing contact details, and mirrors the behavior of a typical contact management system.

### Features
- Routes and components for:

    - Add Contact (with Save and Cancel)

    - Edit Contact (with Save and Cancel)

    - Delete Contact (with confirmation prompt)

    - View Contact Info

- Navigates between views using Angular's RouterModule

- Clean component structure and separation of concerns


## Setup Instructions
- Navigate to the routing project folder

- Install dependencies:

npm install
ng serve
Open in browser: [http://localhost:4200](http://localhost:4200)

## Technologies Used
- Angular

- Angular Services & Dependency Injection

- Angular Routing Module

- HTML5/CSS3

- MapQuest API