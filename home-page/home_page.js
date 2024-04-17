var timeouts = [];
var logged_in_user_id = 3;

// (incomplete) dictionary to map tagIDs to their respective Font Awesome icons
const tagIDToIcon = {
    "0": "map-pin", // used for default icon
    "1": "camera",
    "1.1": "tree",
    "1.1.1": "binoculars",
    "1.1.2": "tornado", // used for waterfall icon since no waterfall icon exists 
    "1.1.3": "mountain",
    "1.1.4": "icicles", // used for cave icon since no cave icon exists
    "1.1.5": "umbrella-beach",
    "1.2": "monument",
    "1.2.1": "place-of-worship",
    "1.2.2": "building",
    "1.2.3": "palette",
    "1.2.4": "road",
    "2": "burst",
    "2.1": "building-columns",
    "2.2": "store",
    "2.3": "utensils"
};

// (incomplete) dictionary to map a given tag icon (by ID) to their respective colours
const tagIDToColor = {
    "0": "maroon", // black used as default colour
    "1": "maroon",
    "1.1": "ForestGreen",
    "1.1.1": "SkyBlue",
    "1.1.2": "blue",
    "1.1.3": "DarkSlategrey",
    "1.1.4": "DimGrey",
    "1.1.5": "#E5C975",
    "1.2": "LightSlateGray",
    "1.2.1": "BlueViolet",
    "1.2.2": "brown",
    "1.2.3": "orange",
    "1.2.4": "black",
    "2": "HotPink",
    "2.1": "green",
    "2.2": "yellow",
    "2.3": "brown"
}



//Calls the function 'callback' after a certain amount of time 'delay'
function SetDelayedFunction(callback, delay) {
    var timer = setTimeout(callback, delay);
    timeouts.push(timer);
    return timer;
}

//cancels any DelayedFunctions waiting to happen
function ClearAllTimeouts() {
    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    timeouts = [];
}

//Adds a place to the database once the user clicks submit
function SubmitPlace() {
    if (document.getElementById("place-loading-container").style.display === "block") {
        alert("Please wait for your previous action to process.");
        return;
    }
    ClearAllTimeouts();

    const PLACE_NAME = document.getElementById("place_name").value;
    const LOCATION = document.getElementById("location").value;
    const PLACE_DESCRIPTION = document.getElementById("place_description").value;
    const PLACE_TAG = document.getElementById("tag-selector").value;


    document.getElementById("place-loading-container").style.display = "block";

    var button = document.querySelector(".submission_button");
    button.textContent = "Loading...";

    //Puts the word 'Submit' back in the button after 500 milliseconds
    SetDelayedFunction(function () { button.textContent = "Submit"; }, 500);
    SetDelayedFunction(function () { document.getElementById("responseContainer").innerHTML = ""; }, 500);

    //Checks and alerts if any of the fields are empty
    if (PLACE_NAME.trim() === "" || LOCATION.trim() === "" || PLACE_DESCRIPTION.trim() === "") {
        var error_message = document.getElementById("errorMessage");
        error_message.textContent = "Please fill all fields.";
        error_message.style.display = "block";
        SetDelayedFunction(function () { error_message.textContent = ""; error_message.style.display = "none"; }, 2500);
        document.getElementById('responseContainer').textContent = "";
        document.getElementById("place-loading-container").style.display = "none";
        return;
    }

    //Checks and alerts if the location is not valid
    if (!isValidLocation(LOCATION)) {
        var error_message = document.getElementById("errorMessage");
        error_message.textContent = "Invalid location. Please try again.";
        document.getElementById("place-loading-container").style.display = "none";
        error_message.style.display = "block";
        SetDelayedFunction(function () { error_message.textContent = ""; error_message.style.display = "none"; }, 2500);
        return;
    }

    //Clear all the entries

    //Accesses the database by calling the store_place_home.php script
    xhr = new XMLHttpRequest();
    xhr.open("POST", "store_place_home.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //Checks and alerts that request was successful (indicated by a status of 200)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response_text = xhr.responseText;
                document.getElementById("responseContainer").innerHTML = response_text;
                document.getElementById("place-loading-container").style.display = "none";
                document.getElementById("place_name").value = "";
                document.getElementById("location").value = "";
                document.getElementById("place_description").value = "";
                document.getElementById("errorMessage").textContent = "";
                document.getElementById('responseContainer').textContent = "";
                document.getElementById("tag-selector").value = "0";
                TagChanged();
                initMap(false);
            }
            else {
                console.error('Error occurred: ' + xhr.status);
                document.getElementById("place-loading-container").style.display = "none";
            }
        }
    };
    xhr.send("place_name=" + PLACE_NAME + "&location=" + LOCATION + "&place_description=" + PLACE_DESCRIPTION + "&place_tag=" + PLACE_TAG + "&logged_user_id=" + logged_in_user_id);
}
//this function calls php code to return all place data from the database - more can be added as needed
async function getPlaceData(placeIDs = null) {
    // if no placeIDs are passed in, get all places (placeID array used when loading routes)

    var placeData;
    await jQuery.ajax({
        type: "POST",
        url: 'getPlaces.php',
        dataType: 'json',
        data: { functionname: 'getPlaces', arguments: placeIDs },

        success: function (obj, textstatus) {
            if (!('error' in obj)) {
                placeData = obj.result;
            }
            else {
                console.log(obj.error);
            }
        }
    }).done(function (data) {
        var placeData = data;
    })
        .fail(function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!"); //annoying but useful
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        });

    return await placeData;
}

async function getReviewData(ID) {
    var reviewData;
    await jQuery.ajax({
        type: "POST",
        url: 'getPlaces.php',
        dataType: 'json',
        data: { functionname: 'getReviews', arguments: [ID] },

        success: function (obj, textstatus) {
            if (!('error' in obj)) {
                reviewData = obj.result;
            }
            else {
                console.log(obj.error);
            }
        }
    }).done(function (data) {
        var reviewData = data;
    })
        .fail(function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!"); //annoying but useful
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        });

    return await reviewData;
}
//We only want one map, so declare it here
var map;
var markers;
//Initialises Google Maps API. Async keyword means it runs without freezing the entire program
async function initMap(first_init = true, placeIDs = null) {
    //if placeIDs is null, get all places
    var placeData = await getPlaceData(placeIDs);
    const firstPlace = placeData[0];
    const firstPlaceCoords = { lat: parseFloat(firstPlace.latitude), lng: parseFloat(firstPlace.longitude) };

    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
        "marker",
    );

    //Only want to initialise the map when the page is opened for the first time
    if (first_init) {
        map = new Map(document.getElementById('map'), {
            center: firstPlaceCoords, // center map on co-ordinates of first place
            zoom: 8,
            draggableCursor: 'auto',
            draggingCursor: 'move',
            mapTypeControl: false,
            mapId: 'DEMO_MAP_ID',
        });
    }
    //define an infowindow so all markers can have one on click
    /*const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
    });*/

    //define markers based on placeData array, add a listener to all of them
    markers = placeData.map((element, i) => { //go through every element of placedata, make a marker with attached infowindow out of it
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: ({ lat: parseFloat(element.latitude), lng: parseFloat(element.longitude) }),
            map, //might need to remove this to make marker clustering work
            content: buildContent(element),
        })


        marker.addListener("click", () => { //add an infowindow to each marker just for fun
            //infoWindow.setContent(element.PlaceName + '\n' + element.PlaceDesc);
            //infoWindow.open(map, marker);
            //document.getElementById('browse_place_name').value = element.PlaceName; //this lines can be included when the pages exist
            //document.getElementById('browse_place_description').value = element.PlaceDesc; //this lines can be included when the pages exist
            //document.getElementById('browse_location').value = element.latitude + ', ' + element.longitude; //this lines can be included when the pages exist

            //unselect all other selected markers
            markers.forEach(otherMarker => {
                if (otherMarker.content.classList.contains("highlight") && otherMarker != marker) {
                    toggleHighlight(otherMarker, null);
                }
            });

            toggleHighlight(marker, element);
            PlaceInfoShow(element);

            //if the add routes window is showing, do something.

            if (document.getElementById("add_route_input_box").style.display === "block") {
                document.getElementById("newPlaceName").value = element.PlaceName
            }
        });

        return marker;
    });

    const algorithm = new markerClusterer.SuperClusterAlgorithm({ radius: 20 }); // smaller radius reduces clustering (markers need to be closer to cluster)
    const clusterer = new markerClusterer.MarkerClusterer({ map, markers, algorithm });

    var clickMarker = new google.maps.Marker; //maybe advancedMarkerElement?


    //Add an event listener for map clicks
    map.addListener('click', function (event) {
        var geocoder = new google.maps.Geocoder();
        var location = event.latLng;
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        document.getElementById('location').value = longitude + ', ' + latitude;

        clickMarker.setMap(null)

        clickMarker = new google.maps.Marker({ //displays a marker wherever you last clicked! - we can make the marker look nicer whenever using advancedmarkerelement
            position: { lat: latitude, lng: longitude },
            map,
        })

        // toggle off any other selected places
        markers.forEach(marker => {
            if (marker.content.classList.contains("highlight")) {
                toggleHighlight(marker, null);
            }
        });


        //Get the clicked location's details
        geocoder.geocode({ 'location': location }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    var placeName = results[0].name || '';
                    var formattedAddress = results[0].formatted_address || '';

                    document.getElementById('place_name').value = placeName;
                    document.getElementById('place_description').value = formattedAddress;
                }
            }
            else {
                console.error('Geocoder failed due to: ' + status);
            }
        });
    });
    document.getElementById("transparent_container").classList.add("slide-in-transparent-container");
    document.getElementById("icon").classList.add("slide-in-transparent-container");
}

//Called each time the Search Location bar is changed, and tries to find the input location.
function FindLocation() {
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById("searchbar").value;
    document.getElementById("place_name").value = capitalizeWords(address);
    var button = document.getElementById("search-btn");
    button.classList.add("expand-and-contract");
    setTimeout(function () {
        button.classList.remove("expand-and-contract");
    }, 500);
    //Geocodes the address
    geocoder.geocode({ 'address': address }, function (results, status) {

        //If the input address was successfully matched against one by google
        if (status === 'OK') {

            //Stores a more accurate address generated by google and displays it in the description box
            var google_address = "";
            if (results[0]) {
                google_address = results[0].formatted_address;
                document.getElementById("place_description").value = google_address;
            }

            var location = results[0].geometry.location;
            var latitude = location.lat();
            var longitude = location.lng();

            document.getElementById('location').value = longitude + ', ' + latitude;

            map.setCenter({ lat: latitude, lng: longitude });
            map.setZoom(15);

        }
    });
}

//creates content for advanced html info on each marker - just a simplified version for now, this could easily be updated to include whatever info we want!
function buildContent(element) {

    const content = document.createElement("div");

    const iconName = tagIDToIcon[element.TagID];
    const iconColor = tagIDToColor[element.TagID];

    content.style.backgroundColor = iconColor; //set icon background as tag color

    content.classList.add("element");
    content.innerHTML = `
    <div class = "icon">
        <i aria-hidden = "true" class = "fa fa-icon fa-${iconName} marker_icon" style="color: white" title="marker_icon"></i>
        <span class="fa-sr-only">${element.PlaceName}</span>
    </div>
    <div class = "details">
        <div class = "place_name">
        <p>${element.PlaceName}</p>
        </div>
        <div class = "place_desc" style = "{width: 30em; word-wrap: normal;}">
        <p>${element.PlaceDesc}</p>
        </div>
    </div>
    `;
    return content;
}

//toggles whether advanced html info shows for a marker on home page
function toggleHighlight(markerView, property) {
    if (markerView.content.classList.contains("highlight")) {
        markerView.content.classList.remove("highlight");
        markerView.zIndex = null;
    } else {
        markerView.content.classList.add("highlight");
        markerView.zIndex = 1;
    }
}
//Changes the map location each time they manually enter a valid latitude and longitude
function LocationInputChanged() {
    var coordinates = document.getElementById("location").value;
    coordinates = coordinates.trim().replace(/\s/g, '');
    numbersArray = coordinates.split(",");
    var latitude = parseFloat(numbersArray[0]);
    var longitude = parseFloat(numbersArray[1]);
    if (containsOnlyNumbers(latitude) && containsOnlyNumbers(longitude)) {
        map.setCenter({ lat: latitude, lng: longitude });
    }
}

//Checks that the string is a number
function containsOnlyNumbers(input_string) {
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
function isValidLocation(location) {
    var regex = /^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/;
    return regex.test(location);
}

function AddMarkerClicked() {
    HideAllInputDivs();
    var div = document.getElementById("add_marker_input_box");
    div.style.display = "block";
    div.classList.add("slide-in");

    var button = document.getElementById("AddMarkerButton");
    button.classList.add("expand-and-contract");
    setTimeout(function () {
        button.classList.remove("expand-and-contract");
    }, 500);
}

function AddRouteClicked() {
    HideAllInputDivs();
    var div = document.getElementById("add_route_input_box");
    div.style.display = "block";
    div.classList.add("slide-in");

    var button = document.getElementById("AddRouteButton");
    button.classList.add("expand-and-contract");
    setTimeout(function () { button.classList.remove("expand-and-contract"); }, 500);
}
function BrowseMarkersClicked() {
    HideAllInputDivs();
    var div = document.getElementById("browse_markers_input_box");
    div.style.display = "block";
    div.classList.add("slide-in");

    var button = document.getElementById("BrowseMarkersButton");
    button.classList.add("expand-and-contract");
    setTimeout(function () {
        button.classList.remove("expand-and-contract");
    }, 500);
}
function BrowseRoutesClicked() {
    HideAllInputDivs();
    var div = document.getElementById("browse_routes_input_box");
    div.style.display = "block";
    div.classList.add("slide-in");

    var button = document.getElementById("BrowseRoutesButton");
    button.classList.add("expand-and-contract");
    setTimeout(function () {
        button.classList.remove("expand-and-contract");
    }, 500);
}

async function PlaceInfoShow(place) {
    console.log("Function called successfully")
    var add_routes = document.getElementById("add_route_input_box");
    var add_place = document.getElementById("add_marker_input_box");
    if (add_routes.style.display == "none" && add_place.style.display == "none") {
        console.log("if statement reached")
        HideAllInputDivs();
        console.log(place);
        var reviews = await getReviewData(place.PlaceID);
        console.log(reviews)
        var header = document.getElementById("place_title");
        var description = document.getElementById("place_description_reviews");
        var review_div = document.getElementById("reviews_for_place");
        var button = document.getElementById("add_review_btn");
        button.setAttribute("onclick", `openPopup(${place.PlaceID})`);
        header.innerHTML = place.PlaceName;
        description.innerHTML = place.PlaceDesc;
        var reviews_html = '';
        if (reviews != "Query Failed") {
            for (i = 0; i < reviews.length; i++) {
                console.log("creating reviews")

                reviews_html += `
                <h3>${reviews[i].Username}</h3>
                <p>${ratingToStars(reviews[i].Rating)}</p>
                <p>${reviews[i].ReviewDesc}</p>
                <div class="stars-outer" style="display: inline-block;
                                                position: relative;
                                                font-family: FontAwesome;">
                    <div class="stars-inner" style = ""></div>
                </div>
                <hr>
                `;
            };
        }
        else {
            reviews_html = "<p>No reviews yet</p>"
        }
        review_div.innerHTML = reviews_html;
        var div = document.getElementById("place_info_view_box");
        div.style.display = "block";
        div.classList.add("slide-in");
    }
}

function ratingToStars(rating) {
    originalRating = rating;
    rating = Math.round(rating * 2) / 2 // round to nearest 0.5
    fullStars = Math.floor(rating);
    halfStars = rating % 1 != 0;
    emptyStars = Math.floor(5 - rating)
    fullStar = '<i class="fa-solid fa-star" style="color: gold"></i>';
    halfStar = '<i class="fa-solid fa-star-half-stroke" style="color: gold"></i>';
    emptyStar = '<i class="fa-regular fa-star" style="color: gold"></i>'
    return `${fullStar.repeat(fullStars) + halfStar.repeat(halfStars) + emptyStar.repeat(emptyStars) + " " + originalRating}`;
}

function smoothRatingToStars(rating) {
    // not yet working - implement smoother star rating visual in reviews bar
    fullStar = '<i class="fa-solid fa-star" style="color: gold"></i>';
    emptyStar = '<i class="fa-regular fa-star"></i>';
    divs = `<div class="stars-outer" style="display: inline-block;
                                            position: relative;
                                            font-family: FontAwesome;"
                <div class="stars-inner"></div>
            </div>`;

}

function HideAllInputDivs() {
    //needs to be updated to hide all the other divs that are to be created
    document.getElementById("add_marker_input_box").style.display = "none";
    document.getElementById("add_route_input_box").style.display = "none";
    document.getElementById("browse_routes_input_box").style.display = "none";
    document.getElementById("browse_markers_input_box").style.display = "none";
    document.getElementById("place_info_view_box").style.display = "none";
}

function buildReviewContent(review) {

}

async function submit_search_place() { //searches database for the place - we do a lil fuzzy search??? also maybe move map centre to the marker you find.
    /* ADD SOME ERROR CHECKING */

    document.getElementById("searchPlacesList").innerHTML = "";
    document.getElementById("search-loading-container").style.display = "block";
    document.getElementById("searchResponseContainer").innerHTML = "";
    setTimeout(function () {
        document.getElementById("search-loading-container").style.display = "none";

    }, 5000);

    var locations;
    var search = document.getElementById("search_places").value;

    if (search.length < 2) {
        document.getElementById("searchResponseContainer").textContent = "Enter at least 2 characters to search.";
        document.getElementById("search-loading-container").style.display = "none";
        SetDelayedFunction(function () {
            document.getElementById("searchResponseContainer").innerHTML = "";
        }, 5000);
    }
    else {
        await jQuery.ajax({
            type: "POST",
            url: 'getPlaces.php',
            dataType: 'json',
            data: { functionname: 'searchPlace', arguments: [search] },

            success: function (obj, textstatus) {
                if (!('error' in obj)) {
                    locations = obj.result;
                }
                else {
                    console.log(obj.error);
                }
            }
        }).done(function (data) {
            var locations = data;
        })
            .fail(function (xhr, status, errorThrown) {
                alert("Sorry, there was a problem!"); //annoying but useful
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            });
        document.getElementById("search-loading-container").style.display = "none";
        addSearchPlacesToList(locations);
    }
}

var searchPlaces = [];

function addSearchPlacesToList(locations) {
    if (document.getElementById("search-loading-container").style.display === "block") {
        alert("Please wait for your previous action to process.");
        return;
    }
    ClearAllTimeouts();
    document.getElementById("search-loading-container").style.display = "block";

    if (locations[0] == "Query Failed") {
        document.getElementById("searchResponseContainer").textContent = "There are no corresponding markers with a similar name. Try again.";
        document.getElementById("search-loading-container").style.display = "none";
    }
    else {
        document.getElementById("search-loading-container").style.display = "none";
        searchPlaces = [];
        for (let i = 0; i < locations.length; i++) {
            var place_name = locations[i].PlaceName;
            SetDelayedFunction(function () {
                document.getElementById("searchResponseContainer").innerHTML = "";
            });
            searchPlaces.push(locations[i]);
        }
        updateSearchPlacesList();
        ShowSearchContent();
        document.getElementById("searchPlaces").scrollTop = document.getElementById("searchPlaces").scrollHeight;
    }
}

function updateSearchPlacesList() {
    const search_places_list = document.getElementById('searchPlacesList');

    for (let i = 0; i < searchPlaces.length; i++) {

        var placeName = searchPlaces[i].PlaceName
        var list_item = document.createElement('li');

        var place_container = document.createElement("div");
        place_container.style.display = 'flex';
        place_container.style.borderRadius = '10px';
        place_container.style.justifyContent = "space-between";
        place_container.style.alignItems = 'center';
        place_container.style.height = "40px";
        place_container.style.marginTop = "10px";

        var select_button = document.createElement('button');
        select_button.textContent = placeName;
        select_button.style.width = 'auto';
        select_button.style.height = "30px"; // Increase the height to accommodate the text
        select_button.style.display = "flex"; // Set display to flex
        select_button.style.alignItems = "center"; // Align items vertically center
        select_button.style.marginTop = "5px";
        select_button.style.marginRight = "5px";
        select_button.style.borderRadius = "5px";
        select_button.style.padding = "0 10px";
        select_button.style.backgroundColor = "green";
        select_button.style.borderStyle = "solid";
        select_button.style.borderWidth = "0.1px";
        select_button.style.borderColor = "#000";
        //make options look better

        place_container.appendChild(select_button);
        list_item.appendChild(place_container);

        select_button.addEventListener('click', () => {
            SearchPlaceSelect(searchPlaces[i].latitude, searchPlaces[i].longitude);
        });
        search_places_list.appendChild(list_item);
    };
}

function SearchPlaceSelect(latitude, longitude) {
    map.panTo({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
    map.setZoom(12);
}

function TagChanged() {

    //do this if we manage to find images for each tag.
    var tag_select_box = document.getElementById("tag-selector");
    var selectedOption = tag_select_box.options[tag_select_box.selectedIndex];
    var selectedTagID = selectedOption.value;

    var iconName = tagIDToIcon[selectedTagID];

    var displayed_icon = document.getElementById("tag-image");
    displayed_icon.setAttribute("style", `color: ${tagIDToColor[selectedTagID]};`)
    displayed_icon.dataset.icon = iconName;

    var route_tag_select_box = document.getElementById("route-tag-selector");
    var selectedOption = route_tag_select_box.options[route_tag_select_box.selectedIndex];
    var selectedTagID = selectedOption.value;

    var iconName = tagIDToIcon[selectedTagID];

    var displayed_icon = document.getElementById("route-tag-image");
    displayed_icon.setAttribute("style", `color: ${tagIDToColor[selectedTagID]};`)
    displayed_icon.dataset.icon = iconName;

    //FontAwesome.dom.i2svg(displayed_icon);
    return;
}

var route = new Route("Route", logged_in_user_id, 1, "0");
var routePlaces = [];

function removePlaceFromRoute(index) {
    routePlaces.splice(index, 1);
    route.RemovePlace(index);
    updateRoutePlacesList(); // Update the UI to reflect the changes
    if (routePlaces.length === 0) {
        HideRouteContent();
    }
}

// Function to update the UI by refreshing the list of route places
function updateRoutePlacesList() {
    const route_place_list = document.getElementById('routePlacesList');
    route_place_list.innerHTML = '';


    routePlaces.forEach((place, index) => {

        var list_item = document.createElement('li');

        var place_container = document.createElement("div");
        place_container.style.display = 'flex';
        place_container.style.borderRadius = '10px';
        place_container.style.justifyContent = "space-between";
        place_container.style.alignItems = 'center';
        place_container.style.height = "40px";

        var place_label = document.createElement("label");
        place_label.textContent = place.place_name;
        place_label.style.marginLeft = "5px";
        place_label.style.marginRight = "5px";
        place_container.appendChild(place_label);

        var remove_button = document.createElement('button');
        remove_button.textContent = 'Discard';
        remove_button.style.width = 'auto';
        remove_button.style.height = "20px"; // Increase the height to accommodate the text
        remove_button.style.display = "flex"; // Set display to flex
        remove_button.style.alignItems = "center"; // Align items vertically center
        remove_button.style.marginTop = "10px";
        remove_button.style.marginRight = "5px";
        remove_button.style.borderRadius = "20px";
        remove_button.style.padding = "0 10px";
        remove_button.style.color = "red";
        remove_button.style.borderStyle = "solid";
        remove_button.style.borderWidth = "0.1px";
        remove_button.style.borderColor = "#000";

        if (index % 2 == 1) {
            place_container.style.background = "#fff";
            remove_button.style.background = "#f2f2f2";
        }
        else {
            remove_button.style.background = "#fff";
        }
        place_container.appendChild(remove_button);
        list_item.appendChild(place_container);

        remove_button.addEventListener('click', () => {
            removePlaceFromRoute(index);
        });

        route_place_list.appendChild(list_item);
    });
}

//Adds a place to the route collection
function addPlaceToRoute() {
    if (document.getElementById("loading-container").style.display === "block") {
        alert("Please wait for your previous action to process.");
        return;
    }
    ClearAllTimeouts();
    document.getElementById("loading-container").style.display = "block";
    const new_place_name_input = document.getElementById('newPlaceName');
    const place_name = new_place_name_input.value.trim();

    if (place_name !== '') {
        GetPlaceId(place_name, function (place_id) {
            if (place_id === "-1") {
                document.getElementById("routeResponseContainer2").textContent = "That place does not exist. Clicking on the corresponding marker might help you.";
                document.getElementById("loading-container").style.display = "none";
                SetDelayedFunction(function () {
                    document.getElementById("routeResponseContainer2").innerHTML = "";
                }, 5000);
                return;
            } else {
                document.getElementById("routeResponseContainer").textContent = "This place has been added to the route!";
                document.getElementById("loading-container").style.display = "none";

                SetDelayedFunction(function () {
                    document.getElementById("routeResponseContainer").innerHTML = "";
                }, 5000);
                let place = new Place(place_id, "", "", "", "", place_name, "");
                routePlaces.push(place);
                route.AddPlace(place);
                updateRoutePlacesList();
                new_place_name_input.value = '';
            }

            if (routePlaces.length > 0) {
                ShowRouteContent();
            }

            document.getElementById("routePlaces").scrollTop = document.getElementById("routePlaces").scrollHeight;
        });
    } else {
        document.getElementById("routeResponseContainer2").textContent = "Please enter a place, or click on a marker.";
        document.getElementById("loading-container").style.display = "none";
        SetDelayedFunction(function () {
            document.getElementById("routeResponseContainer2").innerHTML = "";
        }, 5000);
    }
}
//Gets the id of a place, given the name, then calls callback if it was successfull.
function GetPlaceId(place_name, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "get_place_id.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response_text = xhr.responseText;
                callback(response_text);
                document.getElementById("route_description_textarea").value = "";
                document.getElementById("route-tag-selector").value = "0";
                TagChanged();
            } else {
                console.error('Error occurred: ' + xhr.status);
            }
        }
    };
    xhr.send("place_name=" + place_name);
}
function SubmitRoute() {

    if (document.getElementById("loading-container").style.display === "block") {
        alert("Please wait for your previous action to process.");
        return;
    }
    document.getElementById("loading-container").style.display = "block";
    let route_desc = document.getElementById("route_description_textarea").value;
    if (route_desc === "") {
        route_desc = "No route description";
    }
    let route_tag = document.getElementById("route-tag-selector").value;
    route.SetRouteTag(route_tag);
    route.SetRouteDescription(route_desc);
    route.StoreRoute();
    route = new Route("", logged_in_user_id, 1, "0");
    routePlaces = [];
    HideRouteContent();
}
function HideRouteContent() {
    document.getElementById("routePlaces").style.display = "none";
    document.getElementById("submit_route_button").style.display = "none";
    document.getElementById("route_tracker_header").style.display = "none";
    document.getElementById("route_description_textarea").style.display = "none";
    document.getElementById("route_description_label").style.display = "none";
    document.getElementById("route-tag-select-container").style.display = "none";
    document.getElementById("route_tag_label").style.display = "none";
}
function ShowRouteContent() {
    document.getElementById("routePlaces").style.display = "block";
    document.getElementById("submit_route_button").style.display = "block";
    document.getElementById("route_tracker_header").style.display = "block";
    document.getElementById("route_description_textarea").style.display = "block";
    document.getElementById("route_description_label").style.display = "block";
    document.getElementById("route-tag-select-container").style.display = "flex";
    document.getElementById("route_tag_label").style.display = "block";
}

function ShowSearchContent() {
    document.getElementById("searchPlaces").style.display = "none";
}
function HideSearchContent() {
    document.getElementById("searchPlaces").style.display = "block";
}
document.addEventListener('DOMContentLoaded', function () {
    // Attach event listener to the search button
    document.getElementById('BrowseRoutesButton').addEventListener('click', searchRoutes);

    async function searchRoutes() {
        var searchCriteria = document.getElementById('searchbar').value.trim();
        if (!searchCriteria) {
            //alert('Please enter some search criteria to find routes (in search bar).');
            searchCriteria = "%"; // search all routes if no criteria entered
        }

        try {
            const response = await fetch('getRoute.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `searchCriteria=${encodeURIComponent(searchCriteria)}`
            });

            if (!response.ok) throw new Error('Network response was not ok.');

            const routes = await response.json();
            displayRoutes(routes);
        } catch (error) {
            console.error('Search failed:', error);
            document.getElementById('routeSearchResults').innerHTML = 'Failed to load routes.';
        }
    }

    function displayRoutes(routes) {
        // show the routes in the search results container

        const resultsContainer = document.getElementById('routeSearchResults');
        resultsContainer.innerHTML = ''; // Clear previous results

        if (routes.length === 0) {
            resultsContainer.innerHTML = '<p>No routes found. Try another search.</p>';
            return;
        }

        // reset map button (to return to map with all markers)
        const resetMap = document.createElement('div');
        resetMap.innerHTML = `<button style="" onclick="initMap(true)">Reset Map</button>
        <hr style="margin-top:5%; margin-bottom:20% border: 3px solid">`;
        resultsContainer.appendChild(resetMap);

        // add entry in sidebar for each route
        routes.forEach(route => {
            const routeElement = document.createElement('div');
            routeElement.innerHTML = `
            <p>Route ID: ${route.RouteID}</p>
            <h5 style="border:solid; border-width: 1px; padding: 2%">${route.RouteDesc}</h5>
            <button onclick="showRoute(${route.RouteID})">See route</button>
        `;
            resultsContainer.appendChild(routeElement);
        });

    }

});

async function showRoute(routeID) {
    // get points in route and display them on the map
    const response = await fetch('get_place_in_route.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `routeID=${routeID}`
    });
    const placeIDs = await response.json();

    initMap(true, placeIDs); // reinitialise the map but with only the places in the route

}
