 (function() {

    window.onload = init;

    var startButton;

    var counter = 0;

    // current location
    var latitude, longitude;

    // Google map
    var map = null;
    var bounds = null;

    // Path
    var path = [];

    var lastMarker = null;

    // register the event handlers

    function init() {
    	startButton = document.getElementById("startButton");
    	startButton.onclick = startTrackingLocation;
        
    }

    function startTrackingLocation() {
        var options = {
            enableHighAccuracy : true,
            timeout : 50000,
            maximumAge : 0
        };

        // get starting location
        navigator.geolocation.getCurrentPosition(
            displayStartLocation, handleError, options);
        
        //"track" the bird every 5 seconds
        setInterval(showSamplePath, 5000);
        
    }

    function displayStartLocation(position) {
        // get coordinates
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        // update DOM starting position
        document.getElementById("latitude").innerHTML = 
                "Start Latitude: " + latitude;
        document.getElementById("longitude").innerHTML = 
                "Start Longitude: " + longitude;
        updateDOM();

        // google maps 
        showOnMap(position.coords);
        
        // disable start button
        startButton.disabled = true;
    }

    function showOnMap(pos) {
        
        var googlePosition = 
            new google.maps.LatLng(pos.latitude, pos.longitude);
        
        var mapOptions = {
            zoom: 15,
            center: googlePosition,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        // get map
        var mapElement = document.getElementById("map");
        map = new google.maps.Map(mapElement, mapOptions);
        
        bounds  = new google.maps.LatLngBounds();
        bounds.extend(googlePosition);
    
        // track bird's path
        path.push({ lat: pos.latitude, lng: pos.longitude });
    
        // add the marker to the map
        var title = "Location Details";
        var content = "Lat: " + pos.latitude + 
                        ", Long: " + pos.longitude;
                        
        addMarker(map, googlePosition, title, content);
    }

    function addMarker(map, latlongPosition, title, content) {
   
        var options = {
            position: latlongPosition,
            map: map,
            title: title,
            clickable: true
        };
        var marker = new google.maps.Marker(options);
    
        var popupWindowOptions = {
            content: content,
            position: latlongPosition
        };
    
        var popupWindow = new google.maps.InfoWindow(popupWindowOptions);
    
        google.maps.event.addListener(marker, 'click', function() {
            popupWindow.open(map);
        });
        
        return marker;
    }
    
    function showSamplePath() {
        
        // determine how change in coordinates
        latitude += Math.random() / 100;
        longitude -= Math.random() / 100;
        
        // next point
        latlong = new google.maps.LatLng(latitude, longitude);
        bounds.extend(latlong);
    
        // add location to path
        path.push({ lat: latitude, lng: longitude });
    
        // draw path
        var line = new google.maps.Polyline({
            path : path,
            strokeColor : '#0000ff',
            strokeOpacity : 1.0,
            strokeWeight : 3
        });
        line.setMap(map);
    
    
        if (lastMarker)
            lastMarker.setMap(null);
        // add the new marker
        lastMarker = addMarker(map, latlong, "Your new location", "You moved to: " + latitude + ", " + longitude);
    
        bounds.extend(latlong);
        map.fitBounds(bounds); 

        updateDOM();
    }

    function updateDOM(){
        // update current position and update #
        counter++;
        document.getElementById("counter").innerHTML = "Update#: " + counter;
        document.getElementById("currentLatitude").innerHTML = "Current Latitude: " + latitude;
        document.getElementById("currentLongitude").innerHTML = "Current Longitude: " + longitude;
    }

    // error handler
    function handleError(error) {
        switch(error.code) {
            case 1:
                updateStatus("The user denied permission");
                break;
            case 2:
                updateStatus("Position is unavailable");
                break;
            case 3:
                updateStatus("Timed out");
                break;
        }
    }

    function updateStatus(message) {
        document.getElementById("status").innerHTML = 
            "<strong>Error</strong>: " + message;
    }


})();









