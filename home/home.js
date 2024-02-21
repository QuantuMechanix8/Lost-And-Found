var placeData = placeDataSent;

//creates map
function initMap() {
    const myLatLng = { lat: 53.480759, lng: -2.242631 }
    //makes map object
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatlng,
      });

    //todo: call php to get all the data from db,
    //make markers and add to map, 
    //return map
}