var timeouts = [];

function SetDelayedFunction(callback, delay){
    var timer = setTimeout(callback, delay);
    timeouts.push(timer)
    return timer;
}

function ClearAllTimeouts(){
    for (let i = 0; i < timeouts.length; i++){
        clearTimeout(timeouts[i])
    }
    timeouts = []
}

function SubmitPlace() {
    ClearAllTimeouts()
    var button = document.querySelector(".submission_button");
    button.textContent = "Submitting...";

    SetDelayedFunction(function() {button.textContent = "Submit";}, 500)
    SetDelayedFunction(function() {document.getElementById("responseContainer").innerHTML = "";}, 5000)

    const PLACE_NAME = document.getElementById("place_name").value;
    const LOCATION = document.getElementById("location").value;
    const PLACE_DESCRIPTION = document.getElementById("place_description").value;
 
    // Check if any of the fields are empty
    if (PLACE_NAME.trim() === "" || LOCATION.trim() === "" || PLACE_DESCRIPTION.trim() === "") {
        var errorMessage = document.getElementById("errorMessage");
        errorMessage.textContent = "Please fill all fields.";
        errorMessage.style.display = "block";
        SetDelayedFunction(function() {errorMessage.textContent = ""; errorMessage.style.display = "none";}, 10000)
        document.getElementById('responseContainer').textContent="";
        return;
    }

    //check if the location is valid
    if (!isValidLocation(LOCATION)){
        var errorMessage = document.getElementById("errorMessage");
        errorMessage.textContent = "Invalid location. Please try again.";
        errorMessage.style.display = "block";
        SetDelayedFunction(function() {errorMessage.textContent = ""; errorMessage.style.display = "none";}, 10000)
        return;
    }


    document.getElementById("place_name").value = "";
    document.getElementById("location").value = "";
    document.getElementById("place_description").value = "";
    document.getElementById("errorMessage").textContent="";
    document.getElementById('responseContainer').textContent="";
    //The below accesses the database by calling the store_place.php script

    xhr = new XMLHttpRequest();

    xhr.open("POST", "store_place.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //This checks that request was successful and alerts if it was
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response_text = xhr.responseText;
                document.getElementById("responseContainer").innerHTML = response_text;
            } else {
                console.error('Error occurred: ' + xhr.status);
            }
        }
    };

    xhr.send("place_name=" + PLACE_NAME + "&location=" + LOCATION + "&place_description=" + PLACE_DESCRIPTION);
}

var map;

// Initialize Google Maps
function initMap() {
    // Create map object
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 53.45621235073006, lng: -2.2282816409214923 },
        zoom: 10,
    });

    // Add click event listener to map
    map.addListener('click', function(event) {
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();

        document.getElementById('location').value = latitude + ', ' + longitude;
    });
}

function FindLocation(){
    var geocoder = new google.maps.Geocoder();

    //Retreive inputted address
    var address = document.getElementById("search").value;
    
    // Geocode the address
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK') {

            var google_address = "";
            //Get a more accurate address from google and display it in info box
            if (results[0]){
                google_address = results[0].formatted_address;
                document.getElementById("place_description").value = google_address
            }

            var location = results[0].geometry.location;
            var latitude = location.lat();
            var longitude = location.lng();
    
            document.getElementById('location').value = latitude + ', ' + longitude;
            document.getElementById("place_name").value = capitalizeWords(address);

            
            map.setCenter({ lat: latitude, lng: longitude });
            map.setZoom(15)

        }
    });

    
}

//Capitalise the first letter of each word in a string
function capitalizeWords(inputString) {
    var excludedWords = ["of", "the", "as", "and", "or"]; // List of excluded words
    var words = inputString.toLowerCase().split(" ");
    for (var i = 0; i < words.length; i++) {
        if (i === 0 || !excludedWords.includes(words[i])) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
    }
    return words.join(" ");
}

function isValidLocation(location){
    var regex = /^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/
    return regex.test(location)
}