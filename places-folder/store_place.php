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

$sql_max_id = "SELECT MAX(PlaceID) AS max_id FROM Place";
$result_max_id = $conn->query($sql_max_id);

if ($result_max_id && $result_max_id->num_rows > 0) {
    $row = $result_max_id->fetch_assoc();
    $max_id = $row["max_id"];
} 
else {
    $max_id = 0;
}

$next_id = $max_id + 1;
$today = date("Y-m-d");

$sql = "INSERT INTO Place (PlaceID, Location, PlaceDesc, UserID, DateCreated, PlaceName)
        VALUES ($next_id, POINT(" . $location . "), '$place_description', 1, '$today', '$place_name')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
