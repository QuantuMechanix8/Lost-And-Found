<?php
//Gets the necessary data sent to the script from the form
$place_id = $_POST["place_id"];
$route_id = $_POST["route_id"];
$order = $_POST["order"];
//Info needed to access database
$database_host = "dbhost.cs.man.ac.uk";
$database_user = "s89990lo"; // use own username
$database_pass = "Immortal1"; // use own password
$database_name = "2023_comp10120_cm7";

$conn = new mysqli($database_host, $database_user, $database_pass, $database_name);

if (!$conn) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO PlaceRoute (PlaceID, RouteID, RouteOrder)
        VALUES ($place_id, $route_id, $order)";

//Sending back the outcome
if ($conn->query($sql) === TRUE) {
    echo "jsdljnfsdlnjkfasljk";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>