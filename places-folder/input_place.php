<!DOCTYPE html>
<html>
<head>
    <title>Input Place</title>
    <link rel="stylesheet" type="text/css" href="input_places.css">
</head>
<body>
    <div class="container1">
        <h1 class="h1">Submission of Place of Interest</h1>
        <div class="input_box">
            <div class="container3" id="responseContainer"></div>
            <h2>Place Details</h2>
            <input type="text" id="search" placeholder="Search for a location">
            <button type="button" onclick="FindLocation()">Search</button>
            <hr>
            <div class="container">
                <!-- Google Maps container -->
                <div id="map" class="map-container"></div>
            </div>
            <form id="place_form">
                <input type="text" placeholder="Place Name" id="place_name"><br>
                <input type="text" placeholder="Location - Latitude, Longitude" id="location"><br>
                <textarea placeholder="Please give any extra information on the place that others might find useful." id="place_description"></textarea><br>
                <button type="button" class = "submission_button" onclick="SubmitPlace()">Submit</button>
            </form>
            <div class="container2" id="errorMessage"></div>
            <hr>
            
        </div>
    </div>

    <script src="input_places.js"></script>

    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCA165EHmMbHYcMzsE9ykz2zSv9Essn9ds&callback=initMap"></script>
</body>
</html>
