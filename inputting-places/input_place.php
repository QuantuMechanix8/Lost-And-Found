<!DOCTYPE html>
<html>
<head>
    <title>Input Place</title>
    <link rel="stylesheet" type="text/css" href="input_places.css">
</head>
<body>
    <div id="map" class="map-container"></div>
        <div class="container1">
            <nav id="navbar">
                <div id="searchbar">
                    <label for="search" class="formlbl">Search</label><br>
                    <input type="text" id="search" oninput="FindLocation()" placeholder="You can search for a location below. This will autofill the entries">
                </div>
                <div id="buttons">
                    <button>Add Markers</button>
                    <button>Add Route</button>
                    <button>Browse Markers</button>
                    <button>Browse Routes</button>
                </div>
            </nav>
        <div class="form-container">
            
            <div class="input_box">
                <div class="container2" id="responseContainer"></div>
                <h2>Place Details</h2>
                
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
        </div>
    </div>
    <script src="input_places.js"></script>
    <script>
    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
        key: "AIzaSyCA165EHmMbHYcMzsE9ykz2zSv9Essn9ds",
        v: "weekly",
    });
    </script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCA165EHmMbHYcMzsE9ykz2zSv9Essn9ds&callback=initMap"></script>

</body>
</html>
