<?php
// script to get the placeIDs of all the places in a route

//Gets the necessary data sent to the script from the form
$routeID = $_POST["routeID"];
//Info needed to access database
$database_host = "dbhost.cs.man.ac.uk";
$database_user = "n23551sf"; // use own username
$database_pass = "gEKn4ane6N62wovo"; // use own password
$database_name = "2023_comp10120_cm7";

$conn = new mysqli($database_host, $database_user, $database_pass, $database_name);

if (!$conn) {
    die("Connection failed: " . $conn->connect_error);
}
// Prepare SQL query to select places with the specified name
$sql = "SELECT PlaceID FROM PlaceRoute WHERE routeID = $routeID";

// Execute SQL query
$result = $conn->query($sql);

// Check if any rows were returned
if ($result->num_rows > 0) {
    // Output data of each row
    $places = array();
    while($row = $result->fetch_assoc()) {
        $places[] = $row["PlaceID"];
    }
    echo json_encode($places);
} else {
    // No places found with the specified name, return error
    echo "Error, no places found within the route";
    
}

// Close database connection
$conn->close();
?>