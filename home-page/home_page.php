<!DOCTYPE html>
<html>
<head>
    <title>Lost and Found Home Page</title>
    <link rel="icon" type="image/png" href="icon2.png">
    <link rel="stylesheet" type="text/css" href="home_page.css">
</head>
<body>
    <div id="map" class="map-container">
    </div>

        <div class="transparent-container" id="transparent_container">

            <nav id="navbar">

                <div id="searchbar-container">

                    <div class="search-container">
                        <input type="text" id="searchbar" placeholder="Search">
                        <button id="search-btn" onclick="FindLocation()"><img src="magnifying-glass.png" alt="Search"></button>
                    </div>

                </div>

                <div id="buttons-container">

                    <button onclick="AddMarkerClicked()">Add Places</button>
                    <button onclick="AddRouteClicked()">Add Routes</button>
                    <button onclick="BrowseMarkersClicked()">Browse Places</button>
                    <button onclick="BrowseRoutesClicked()">Browse Routes</button>

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
                        <button type="button" class = "submission_button" onclick="SubmitPlace()">Submit</button><br>
                    </form>

                </div>

                <div class="container3" id="errorMessage"></div>

            </div>

            <div class="input-box" id="add_route_input_box">
                <h2>Add Routes</h2>
            </div>
            
            <div class="input-box" id="browse_markers_input_box">
                <h2>Browse Places</h2>
            </div>

            <div class="input-box" id="browse_routes_input_box">
                <h2>Browse Routes</h2>
            </div>


        </div>

    </div>

    <script src="home_page.js"></script>
    <script>(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({key: "AIzaSyCA165EHmMbHYcMzsE9ykz2zSv9Essn9ds",v: "weekly",});</script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCA165EHmMbHYcMzsE9ykz2zSv9Essn9ds&callback=initMap"></script>

</body>
</html>
