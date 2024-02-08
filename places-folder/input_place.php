<!DOCTYPE html>
<html>
<head>
    <title>Input Place</title>
    <link rel="stylesheet" type="text/css" href="input_places.css">
</head>
<body>
    <div class="container1">
        <h1 class="h1">Enter Place of Interest</h1>
        <div class="input_box">
            <div class="container3" id="responseContainer"></div>
            <h2>Place Details</h2>
            <div class="container">
                <!-- Google Maps container -->
                <div id="map" class="map-container"></div>
            </div>
            <form id="place_form">
                <input type="text" placeholder="Place Name" id="place_name"><br>
                <input type="text" placeholder="Location - (Latitude, Longitude)" id="location" readonly><br>
                <textarea placeholder="Please describe the place. Include anything you think is important to travellers. You can expand this text area using the icon in the bottom right of the box." id="place_description"></textarea><br>
                <button type="button" onclick="SubmitPlace()">Submit</button>
            </form>
            <div class="container2" id="errorMessage"></div>
            <input type="text" id="autocomplete" placeholder="Search for a location">
        </div>
    </div>

    <script src="input_places.js"></script>

    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCA165EHmMbHYcMzsE9ykz2zSv9Essn9ds&callback=initMap"></script>
</body>
</html>
