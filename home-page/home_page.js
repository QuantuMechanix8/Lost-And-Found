var timeouts = [];

//Calls the function 'callback' after a certain amount of time 'delay'
function SetDelayedFunction(callback, delay){
    var timer = setTimeout(callback, delay);
    timeouts.push(timer);
    return timer;
}

//cancels any DelayedFunctions waiting to happen
function ClearAllTimeouts(){
    for (let i = 0; i < timeouts.length; i++){
        clearTimeout(timeouts[i]);
    }
    timeouts = [];
}

//Adds a place to the database once the user clicks submit
function SubmitPlace() {
    ClearAllTimeouts();

    //Retrieve the inputted data
    const PLACE_NAME = document.getElementById("place_name").value;
    const LOCATION = document.getElementById("location").value;
    const PLACE_DESCRIPTION = document.getElementById("place_description").value;

    var button = document.querySelector(".submission_button");
    button.textContent = "Submitting...";

    //Puts the word 'Submit' back in the button after 500 milliseconds
    SetDelayedFunction(function() {button.textContent = "Submit";}, 500);
    SetDelayedFunction(function() {document.getElementById("responseContainer").innerHTML = "";}, 5000);

    //Checks and alerts if any of the fields are empty
    if (PLACE_NAME.trim() === "" || LOCATION.trim() === "" || PLACE_DESCRIPTION.trim() === "") {
        var error_message = document.getElementById("errorMessage");
        error_message.textContent = "Please fill all fields.";
        error_message.style.display = "block";
        SetDelayedFunction(function() {error_message.textContent = ""; error_message.style.display = "none";}, 10000);
        document.getElementById('responseContainer').textContent="";
        return;
    }

    //Checks and alerts if the location is not valid
    if (!isValidLocation(LOCATION)){
        var error_message = document.getElementById("errorMessage");
        error_message.textContent = "Invalid location. Please try again.";
        error_message.style.display = "block";
        SetDelayedFunction(function() {error_message.textContent = ""; error_message.style.display = "none";}, 10000);
        return;
    }

    //Clear all the entries
    document.getElementById("place_name").value = "";
    document.getElementById("location").value = "";
    document.getElementById("place_description").value = "";
    document.getElementById("errorMessage").textContent="";
    document.getElementById('responseContainer').textContent="";

    //Accesses the database by calling the store_place_home.php script
    xhr = new XMLHttpRequest();
    xhr.open("POST", "store_place_home.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //Checks and alerts that request was successful (indicated by a status of 200)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response_text = xhr.responseText;
                document.getElementById("responseContainer").innerHTML = response_text;
            } 
            else {
                console.error('Error occurred: ' + xhr.status);
            }
        }
    };
    xhr.send("place_name=" + PLACE_NAME + "&location=" + LOCATION + "&place_description=" + PLACE_DESCRIPTION);
}

//We only want one map, so declare it here
var map;

//Initialises Google Maps API. Async keyword means it runs without freezing the entire program
async function initMap() {
    const {Map} = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById('map'), {
        center: { lat: 53.45621235073006, lng: -2.2282816409214923 },
        zoom: 10,
        draggableCursor: 'auto',
        draggingCursor: 'move',
        mapTypeControl: false
    }); 

    map.setOptions({draggableCursor:'auto'});

    //Add an event listener for map clicks
    map.addListener('click', function(event) {
        var geocoder = new google.maps.Geocoder();
        var location = event.latLng;
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        document.getElementById('location').value = latitude + ', ' + longitude;

        //Get the clicked location's details
        geocoder.geocode({ 'location': location }, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    var placeName = results[0].name || '';
                    var formattedAddress = results[0].formatted_address || '';

                    document.getElementById('place_name').value = placeName;
                    document.getElementById('place_description').value = formattedAddress;
                }
            } else {
                console.error('Geocoder failed due to: ' + status);
            }
        });
    });
    document.getElementById("transparent_container").classList.add("slide-in-transparent-container");
    document.getElementById("icon").classList.add("slide-in-transparent-container");
}

//Called each time the Search Location bar is changed, and tries to find the input location.
function FindLocation(){
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById("searchbar").value;
    document.getElementById("place_name").value = capitalizeWords(address);
    var button = document.getElementById("search-btn");
    button.classList.add("expand-and-contract");
    setTimeout(function() {
        button.classList.remove("expand-and-contract");
    }, 500);
    //Geocodes the address
    geocoder.geocode({ 'address': address }, function(results, status) {

        //If the input address was successfully matched against one by google
        if (status === 'OK') {

            //Stores a more accurate address generated by google and displays it in the description box
            var google_address = "";
            if (results[0]){
                google_address = results[0].formatted_address;
                document.getElementById("place_description").value = google_address;
            }
            
            var location = results[0].geometry.location;
            var latitude = location.lat();
            var longitude = location.lng();
    
            document.getElementById('location').value = latitude + ', ' + longitude;
 
            map.setCenter({ lat: latitude, lng: longitude });
            map.setZoom(15);

        }
    });
}

//Changes the map location each time they manually enter a valid latitude and longitude
function LocationInputChanged(){
    var coordinates = document.getElementById("location").value;
    coordinates = coordinates.trim().replace(/\s/g, '');
    numbersArray = coordinates.split(",");
    var latitude = parseFloat(numbersArray[0]);
    var longitude = parseFloat(numbersArray[1]);
    if (containsOnlyNumbers(latitude) && containsOnlyNumbers(longitude)){
        map.setCenter({ lat: latitude, lng: longitude });
    }
}

//Checks that the string is a number
function containsOnlyNumbers(input_string){
    var regex = /^\s*-?\d+(\.\d+)?\s*$/;
    return regex.test(input_string);
}

//Converts the passed in string into title case
function capitalizeWords(inputString) {
    var excludedWords = ["of", "the", "as", "and", "or", "in", "on", "a"]; // List of excluded words
    var words = inputString.toLowerCase().split(" ");
    for (var i = 0; i < words.length; i++) {
        if (i === 0 || !excludedWords.includes(words[i])) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
    }
    return words.join(" ");
}

//Checks that the location in the text box is a valid Latitude, Longitude
function isValidLocation(location){
    var regex = /^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/;
    return regex.test(location);
}

function AddMarkerClicked(){
    HideAllInputDivs();
    var div = document.getElementById("add_marker_input_box");
    div.style.display="block";
    div.classList.add("slide-in");

    var button = document.getElementById("AddMarkerButton");
    button.classList.add("expand-and-contract");
    setTimeout(function() {
        button.classList.remove("expand-and-contract");
    }, 500);
}

function AddRouteClicked(){
    HideAllInputDivs();
    var div = document.getElementById("add_route_input_box");
    div.style.display="block";
    div.classList.add("slide-in");

    var button = document.getElementById("AddRouteButton");
    button.classList.add("expand-and-contract");
    setTimeout(function() {
        button.classList.remove("expand-and-contract");
    }, 500);
    
}

function BrowseMarkersClicked(){
    HideAllInputDivs();
    var div = document.getElementById("browse_markers_input_box");
    div.style.display="block";
    div.classList.add("slide-in");

    var button = document.getElementById("BrowseMarkersButton");
    button.classList.add("expand-and-contract");
    setTimeout(function() {
        button.classList.remove("expand-and-contract");
    }, 500);
}

function BrowseRoutesClicked(){
    HideAllInputDivs();
    var div = document.getElementById("browse_routes_input_box");
    div.style.display="block";
    div.classList.add("slide-in");

    var button = document.getElementById("BrowseRoutesButton");
    button.classList.add("expand-and-contract");
    setTimeout(function() {
        button.classList.remove("expand-and-contract");
    }, 500);
}
function HideAllInputDivs(){
    //needs to be updated to hide all the other divs that are to be created
    document.getElementById("add_marker_input_box").style.display="none";
    document.getElementById("add_route_input_box").style.display="none";
    document.getElementById("browse_routes_input_box").style.display="none";
    document.getElementById("browse_markers_input_box").style.display="none";
}