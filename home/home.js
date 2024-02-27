
//creates map
/*async function getPlaceData() {
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
    console.log(data);
    var dataOfPlaces = data.result;})
    .fail(function( xhr, status, errorThrown ) {
      alert("Sorry, there was a problem!"); //annoying but useful
      console.log("Error: " + errorThrown);
      console.log("Status: " + status);
      console.dir(xhr);
    });

  console.log(placeData)

  return await placeData;

  
  


}*/

let map;

async function initMap() {

  //var placeData = getPlaceData()

  const { Map } = await google.maps.importLibrary("maps");
  const myLatLng = { lat: -25.363, lng: 131.044 };
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatLng,
  });

 /*let Marker = new google.maps.Marker({
    position: myLatLng,
  });

  Marker.setMap(map)*/

  /*for (let place of placeData) {
    position = {place.latitude,place.longitude};

    let Marker = new google.maps.Marker({
      position: myLatlng
    })
    Marker.setMap(map)
  
  }*/
}

    //todo: call php to get all the data from db,
    //make markers and add to map, 
    //return map
initMap();