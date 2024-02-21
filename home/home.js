
//creates map
async function initMap() {
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
    console.log(data);})
    .fail(function( xhr, status, errorThrown ) {
      alert( "Sorry, there was a problem!" );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
    });

  console.log(placeData);
  console.log("heyyyy");
  document.getElementById("map").setAttribute("innerHTML",placeData);


  //const myLatLng = { lat: 53.480759, lng: -2.242631 }
  //makes map object
  /*const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatlng,
    });

    //todo: call php to get all the data from db,
    //make markers and add to map, 
    //return map*/
}

initMap()