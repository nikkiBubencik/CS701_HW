# Homework 2 – HTML5 Geolocation, Drag & Drop, Web Workers
This project consists of three parts demonstrating HTML5 APIs such as Geolocation, Drag and Drop with Local Storage, and Web Workers. Each part is implemented using pure JavaScript and emphasizes interactivity, asynchronous behavior, and state persistence in the browser.

## [Part 1 – Geolocation Tracker Simulation](./part1_GeoLocation/LocationTracker.html)
### Overview
A simulated bird tracking application using the HTML5 Geolocation API. Since there is no actual bird or GPS device, the app randomly updates a simulated latitude and longitude every 5 seconds to mimic bird movement in the northwest direction.

### Features
- Uses HTML5 Geolocation API to get initial location

- Updates simulated position every 5 seconds

- Disables "Start" button after initial click

- Displays current coordinates and path on a Google Map

- Prevents the simulated bird from flying out of bounds


## [Part 2 – Party-Line Voting (Drag and Drop + Local Storage)](./part2_DragAndDrop/partyWise.html)
### Overview
An interactive political simulation where senators are dragged into their party's section. The senators' voting status is stored in localStorage to persist across sessions. Data is initially loaded via AJAX from partyList.xml.

### Features
- Drag and drop interface for Democrats and Republicans

- AJAX loading of senators from XML

- Converts senator data to JSON and stores in localStorage under senators_bubencik

- Persistently displays senators who have already voted

- Enforces party-specific drop zones

- Prevents dragging already-voted senators


## [Part 3 – Web Workers and Local Storage](./part3_WebWorkers/part3.html)
### Overview
An application using five Web Workers to compute the sum of squares of ranges of numbers (e.g., 1–100, 101–200, etc.). Each worker processes its task independently and returns results asynchronously, which are then stored in localStorage.

### Features
- Spawns n Web Workers 

- Each worker calculates sum of squares over a different range

- Random delay for each result simulates asynchronous behavior

- Results are saved to localStorage using a single key

- UI is updated as each result is received


### How to Run
- Clone the repository or download the files.

- Open [index.html](./index.html) and click a link to a project


## Technologies Used
- HTML5 APIs: Geolocation, Drag & Drop, Web Workers, Local Storage

- JavaScript 

- AJAX for XML parsing

- Google Maps API 
