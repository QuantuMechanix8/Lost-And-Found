
//creates map
async function getPlaceData() {
  var placeData;
  await jQuery.ajax({
    type: "POST",
    url: 'getPlaces.php',
    dataType: 'json',
    data: {functionname: 'getPlaces'},

    success: function (obj, textstatus) {
                  if( !('error' in obj) ) {
                      placeData = obj.result;
                  }
                  else {
                      console.log(obj.error);
                  }
            }
  }).done(function(data) {
    var placeData = data;})
    .fail(function( xhr, status, errorThrown ) {
      alert("Sorry, there was a problem!"); //annoying but useful
      console.log("Error: " + errorThrown);
      console.log("Status: " + status);
      console.dir(xhr);
    });

  return await placeData;

  
  


}

let map;

async function initMap() {

  var placeData = await getPlaceData();
 
  // request needed libraries.
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );

  const myLatLng = { lat: -25.363, lng: 131.044 };
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatLng,
    mapId: 'DEMO_MAP_ID',
  });

  /*let Marker = new google.maps.Marker({
    position: myLatLng,
  });

  Marker.setMap(map);*/


  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  console.log(placeData);
  const markers = placeData.map((element,i) => { //go through every element of placedata, make a marker with attached infowindow out of it
    const marker = new google.maps.marker.AdvancedMarkerElement({
    position : ({ lat: parseFloat(element.latitude), lng : parseFloat(element.longitude)}),
    map,
    });


    marker.addListener("click", () => { //add an infowindow to each marker just for fun
      infoWindow.setContent(element.PlaceName);
      infoWindow.open(map, marker);
    });

    return marker;

  });
  
  //new markerClusterer.MarkerClusterer({ markers, map }); //make a marker clusterer so we don't lag too much (i hope) - needs another library I haven't installed yet


  }


    //todo: call php to get all the data from db,
    //make markers and add to map, 
    //return map
initMap();