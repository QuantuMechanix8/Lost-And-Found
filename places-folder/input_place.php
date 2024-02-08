<!DOCTYPE html>
<html>
<head>
    <title>Input Place</title>
    <link rel="stylesheet" type="text/css" href="input_places.css">
</head>
<body>
    <div class="container1">
        <h1 class = "h1">Enter Place of Interest</h1>
        <div class="input_box">
            <div class="container3" id="responseContainer"></div>
            <h2>Place Details</h2>
            <form id="place_form">
                <input type="text" placeholder="Place Name" id="place_name"><br>
                <input type="text" placeholder="Location - (Latitude, Longitude)" id="location"><br>
                <textarea placeholder="Please describe the place. Include anything you think is important to travellers." id="place_description"></textarea><br>
                <button type="button" onclick="SubmitPlace()">Submit</button>
            </form>
            <div class = "container2"  id = errorMessage></div>
        </div> 
    </div>

    <script src="input_places.js"></script>
</body>
</html>


