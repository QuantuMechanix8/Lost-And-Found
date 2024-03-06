<?php
//Gets the necessary data sent to the script from the form
$place_name = $_POST["place_name"];
$location = $_POST["location"];
$place_description = $_POST["place_description"];
$place_tag = $_POST["place_tag"];
$logged_user_id = $_POST["logged_user_id"];
//Info needed to access database
$database_host = "dbhost.cs.man.ac.uk";
$database_user = "s89990lo"; // use own username
$database_pass = "Immortal1"; // use own password
$database_name = "2023_comp10120_cm7";

$conn = new mysqli($database_host, $database_user, $database_pass, $database_name);

if (!$conn) {
    die("Connection failed: " . $conn->connect_error);
}

//Find the highest ID so the next ID can be calculated
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


//Stores record in the database
$sql = "INSERT INTO Place (PlaceID, Location, PlaceDesc, UserID, DateCreated, PlaceName, tagID)
        VALUES ($next_id, POINT(" . $location . "), '$place_description', $logged_user_id, '$today', '$place_name', '$place_tag')";

//Sending back the outcome
if ($conn->query($sql) === TRUE) {
    echo "Place Successfully Submitted!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
