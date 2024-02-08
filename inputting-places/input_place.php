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
            <div class="formdiv"><label for="search" class="formlbl">Search</label><br></div>
            <input type="text" id="search" oninput="FindLocation()" placeholder="You can search for a location below. This will autofill the entries">
            <div class="container">
                <!-- Google Maps container -->
                <div id="map" class="map-container"></div>
            </div>
            <hr>
            <div class="formdiv">
            <form id="place_form">
                <label for="placename" class="formlbl">Place Name </label><span class="required">*</span><br>
                <input type="text" placeholder="Please enter the name of the place" id="place_name" required><br>
                <label for="placelocation" class="formlbl">Place Location </label><span class="required">*</span><br>
                <input type="text" oninput="LocationInputChanged()" placeholder="Please either select a location on the map or enter a location - Latitude, Longitude" id="location" required><br>
                <label for="placedescription" class="formlbl">Place Description </label><span class="required">*</span><br>
                <textarea placeholder="Please give any extra information on the place that others might find useful." id="place_description" required></textarea><br>
                <button type="button" class = "submission_button" onclick="SubmitPlace()">Submit</button><br>
            </form>
            </div>
            <div class="container2" id="errorMessage"></div>
        </div>
    </div>

    <script src="input_places.js"></script>

    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCA165EHmMbHYcMzsE9ykz2zSv9Essn9ds&callback=initMap"></script>
</body>
</html>
