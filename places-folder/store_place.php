<?php
$place_name = $_POST["place_name"];
$location = $_POST["location"];
$place_description = $_POST["place_description"];

$database_host = "dbhost.cs.man.ac.uk";
$database_user = "s89990lo"; // use own username
$database_pass = "Immortal1"; // use own password
$database_name = "2023_comp10120_cm7";

$conn = new mysqli($database_host, $database_user, $database_pass, $database_name);

if (!$conn) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO Place(PlaceID, Location, PlaceDesc, UserID, DateCreated, PlaceName)
        VALUES (400, POINT(10.1234, 20.5678), 'Leo Testing', 1, '2024-02-08', 'test')"   ;

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
