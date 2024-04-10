<!DOCTYPE html>
<html>

<head>
    <title>Lost and Found Home Page</title>
    <link rel="icon" type="image/png" href="../ui-assets/icon(1).svg">
    <link rel="stylesheet" type="text/css" href="home_page.css">
    <script src="classes/Place.js"></script>
    <script src="classes/Route.js"></script>
    <!-- jQuery script -->
    <script src="../jquery-3.7.1.js"></script>

    <!-- we using fontawesome now baby!-->
    <script src="https://use.fontawesome.com/releases/v6.2.0/js/all.js"></script>

    <style>         
        .popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 350px;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            z-index: 9999;
        }
    </style>


</head>

<body>

<div id="popup" class="popup" style="display: none;">
            <h2>Add Review</h2>
                    <form>
                        <textarea rows="10" cols="50" placeholder="Write your review here" id="ReviewDesc"></textarea>
                        <button type="submit">Submit</button>
                        <button type="button" onclick="closePopup()">Cancel</button>
                    </form>
                </div>

                <script>
                    function openPopup() {
                        document.getElementById("popup").style.display = "block";
                    }

                    function closePopup() {
                        document.getElementById("popup").style.display = "none";
                    }
                </script>
            </div>
    
    <div id="map" class="map-container">
    </div>

    <div class="logo-container" id="icon">
        <img src="images/icon.svg" alt="icon">
    </div>

    <div class="transparent-container" id="transparent_container">

        <nav id="navbar">

            <div id="searchbar-container">

                <div class="search-container">
                    <input type="text" id="searchbar" placeholder="Search">
                    <button id="search-btn" onclick="FindLocation()"><img src="home-images/magnifying-glass.png" alt="Search"></button>
                </div>

            </div>

            <div id="buttons-container">

                <button id="AddMarkerButton" onclick="AddMarkerClicked()">Add Places</button>
                <button id="AddRouteButton" onclick="AddRouteClicked()">Add Routes</button>
                <button id="BrowseMarkersButton" onclick="BrowseMarkersClicked()">Browse Places</button>
                <button id="BrowseRoutesButton" onclick="BrowseRoutesClicked()">Browse Routes</button>

            </div>

        </nav>

        <div class="form-container">

            <div class="input-box" id="add_marker_input_box">

                <div class="response-container" id="responseContainer"></div>

                <h2>Add Place</h2>
                <hr>

                <div class="formdiv">

                    <form id="place_form">
                        <label for="placename" class="formlbl">Place Name </label><span class="required">*</span><br>
                        <input type="text" placeholder="Please enter the name of the place" id="place_name" required><br>
                        <label for="placelocation" class="formlbl">Place Location </label><span class="required">*</span><br>
                        <input type="text" oninput="LocationInputChanged()" placeholder="Please either select a location on the map or enter a location - Latitude, Longitude" id="location" required><br>
                        <label for="placedescription" class="formlbl">Place Description </label><span class="required">*</span><br>
                        <textarea placeholder="Please give any extra information on the place that others might find useful." id="place_description" required></textarea><br>
                        <label for="placetag" class="formlbl">Place Tag </label><span class="required">*</span><br>
                        <div class="tag-select-container">
                            <select onchange="TagChanged()" class="tag-select" id="tag-selector">
                                <option id="house" selected value="0">No Tag</option>
                                <option id="sight" value="1">Sight</option>
                                <option id="nature" value="1.1">Nature</option>
                                <option id="viewpoint" value="1.1.1">Viewpoint</option>
                                <option id="waterfall" value="1.1.2">Waterfall</option>
                                <option id="mountain" value="1.1.3">Mountain</option>
                                <option id="cave" value="1.1.4">Cave</option>
                                <option id="beach" value="1.1.5">Beach</option>
                                <option id="man_made" value="1.2">Man-Made</option>
                                <option id="place_of_worship" value="1.2.1">Place of Worship</option>
                                <option id="building" value="1.2.2">Building</option>
                                <option id="artwork" value="1.2.3">Artwork</option>
                                <option id="street" value="1.2.4">Street</option>
                                <option id="experiences" value="2">Experiences</option>
                                <option id="museum" value="2.1">Museum</option>
                                <option id="market" value="2.2">Market</option>
                                <option id="restaurant" value="2.3">Restaurant</option>
                            </select>
                            <i aria-hidden="true" class="fa fa-icon fa-solid fa-map-pin marker_icon" id="tag-image"></i>
                        </div>
                        <button type="button" class="submission_button" onclick="SubmitPlace()">Submit</button><br>
                        <div class = "loading-containers" id="place-loading-container" style="display: none;">loading...</div>
                    </form>

                </div>

                <div class="container3" id="errorMessage"></div>

            </div>

            <div class="input-box" id="add_route_input_box">
                <div class="response-container" id="routeResponseContainer"></div>
                <h2>Add Routes</h2>
                <hr>

                <div class="formdiv">
                    <label for=""></label>
                    <label for="newPlaceName" class="formlbl">Add a place:</label><span class="required">*</span><br>
                    <input type="text" id="newPlaceName" placeholder="Click on markers to fill this field.">
                    <button id="add_place_button" onclick="addPlaceToRoute()">Add to route</button>
                    <h3 id="route_tracker_header" style="display: none;">Current Route:</h3>
                    <div id="routePlaces">
                        <ol id="routePlacesList">
                            <!-- Individual place items will be dynamically added here -->
                        </ol>
                </div>
                <label for="route_description" id="route_description_label" style="display: none;" class="formlbl">Route Description </label>
                <textarea placeholder="Please give any extra information on the route that others might find useful." id="route_description_textarea" style="display: none;"></textarea><br>
                <label for="routetag" id="route_tag_label" class="formlbl" style="display: none;">Route Tag </label>
                        <div class="tag-select-container" id="route-tag-select-container" style="display: none;">
                            <select onchange="TagChanged()" class="tag-select" id="route-tag-selector">
                                <option id="house" selected value="0">No Tag</option>
                                <option id="sight" value="1">Sight</option>
                                <option id="nature" value="1.1">Nature</option>
                                <option id="viewpoint" value="1.1.1">Viewpoint</option>
                                <option id="waterfall" value="1.1.2">Waterfall</option>
                                <option id="mountain" value="1.1.3">Mountain</option>
                                <option id="cave" value="1.1.4">Cave</option>
                                <option id="beach" value="1.1.5">Beach</option>
                                <option id="man_made" value="1.2">Man-Made</option>
                                <option id="place_of_worship" value="1.2.1">Place of Worship</option>
                                <option id="building" value="1.2.2">Building</option>
                                <option id="artwork" value="1.2.3">Artwork</option>
                                <option id="street" value="1.2.4">Street</option>
                                <option id="experiences" value="2">Experiences</option>
                                <option id="museum" value="2.1">Museum</option>
                                <option id="market" value="2.2">Market</option>
                                <option id="restaurant" value="2.3">Restaurant</option>
                            </select>
                            <i aria-hidden="true" class="fa fa-icon fa-solid fa-map-pin marker_icon" id="route-tag-image"></i>
                        </div>
                <button id = "submit_route_button" onclick="SubmitRoute()">Submit route</button>
                <div class="response-container" id="routeResponseContainer2"></div>
                <div class = "loading-containers" id="loading-container" style="display: none;">loading...</div>
            </div>

            </div>

            <div class="input-box" id="browse_markers_input_box">
                <h2>Browse Places</h2>
                <hr>

                <div class="formdiv" method="post">
                    <label for="search_places" class="formlbl">Search</label>
                    <input type="text" id="search_places" placeholder="Search for a place" name="search_places">
                    <button type="submit" onclick="submit_search_place()">Search</button> <!-- need to make submit_search_place() --->
                    <div class = "loading-containers" id="search-loading-container" style="display: none;">loading...</div>
                </div>
            </div>

            <div class="input-box" id="browse_routes_input_box">
                <h2>Browse Routes</h2>
            </div>
            
            <div class="input-box" id="place_info_view_box">
                <h2 id="place_title">
                    <!-- to be filled by js -->
                </h2>
                <p id="place_description_reviews">temp
                    <!-- to be filled by js -->
                </p>
                <button id="add review" onclick="openPopup()">Add a Review for this place<!-- on click move to a review adding page SAMAR --></button>
                <h2 id="reviews_for_place_title">Reviews</h2>
                <hr>
                <div id="reviews_for_place">
                    <!-- to be filled by js -->
                </div>
                

            </div>


        </div>

    </div>
    <!-- markerClusterer object - we need to make loading efficient! -->
    <script src="https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js"></script>
    <script src="home_page.js"></script>
    <script>
        (g => {
            var h, a, k, p = "The Google Maps JavaScript API",
                c = "google",
                l = "importLibrary",
                q = "__ib__",
                m = document,
                b = window;
            b = b[c] || (b[c] = {});
            var d = b.maps || (b.maps = {}),
                r = new Set,
                e = new URLSearchParams,
                u = () => h || (h = new Promise(async (f, n) => {
                    await (a = m.createElement("script"));
                    e.set("libraries", [...r] + "");
                    for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
                    e.set("callback", c + ".maps." + q);
                    a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
                    d[q] = f;
                    a.onerror = () => h = n(Error(p + " could not load."));
                    a.nonce = m.querySelector("script[nonce]")?.nonce || "";
                    m.head.append(a)
                }));
            d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n))
        })({
            key: "AIzaSyCA165EHmMbHYcMzsE9ykz2zSv9Essn9ds",
            v: "weekly",
        });
    </script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCA165EHmMbHYcMzsE9ykz2zSv9Essn9ds&callback=initMap"></script>

</body>

</html>