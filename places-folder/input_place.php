<!DOCTYPE html>
<html>
<head>
    <title>Place of Interest Form</title>
    <link rel="stylesheet" type="text/css" href="input_places.css">
    <script src="input_places.js"></script>
</head>
<body>
    <div class="container">
        <h1>Enter Place of Interest</h1>
        <div class="input_box">
            <h2>Place Details</h2>
            <form>
                <input type="text" placeholder="Place Name" id="placeName"><br>
                <input type="text" placeholder="Location" id="location"><br>
                <textarea placeholder="Please describe the place. Include anything you think is important to travellers." id="placeDescription"></textarea><br>
                <button type="button" onclick="SubmitPlace()">Submit</button>
            </form>
        </div>
    </div>
</body>
</html>


