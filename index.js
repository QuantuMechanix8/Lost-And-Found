function redirect() {
  window.location.href = './home-page/home_page.php';
}

/*
fetch("./locations.json").then((locations)=>response.json())

function initMap() {
  const myLatlng = { lat: 53.4668, lng: 2.2339 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatlng,
  });
  const html_latLng = document.getElementById("latLng")
  // Create the initial InfoWindow.
  // let infoWindow = new google.maps.InfoWindow({
  //   content: "Click the map to get Lat/Lng!",
  //   position: myLatlng,
  // });

  let Marker = new google.maps.Marker({
    position: myLatlng
  })
  Marker.setMap(map)
  html_latLng.innerHTML = JSON.stringify(myLatlng)


//  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    // infoWindow.close();
    // // Create a new InfoWindow.
    // infoWindow = new google.maps.InfoWindow({
    //   position: mapsMouseEvent.latLng,
    // });
    // infoWindow.setContent(
    //   JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2),
    // );
    // infoWindow.open(map);
    Marker.setMap(null)
    Marker = new google.maps.Marker({
        position: mapsMouseEvent.latLng
    })
    Marker.setMap(map)
    html_latLng.innerHTML = JSON.stringify(mapsMouseEvent.latLng.toJSON())

  })

}

window.initMap = initMap; 
*/