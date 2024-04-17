<?php
//Gets the necessary data sent to the script from the form
$place_name = $_POST["place_name"];
//Info needed to access database
$database_host = "dbhost.cs.man.ac.uk";
$database_user = "s89990lo"; // use own username
$database_pass = "Immortal1"; // use own password
$database_name = "2023_comp10120_cm7";

$conn = new mysqli($database_host, $database_user, $database_pass, $database_name);

if (!$conn) {
    die("Connection failed: " . $conn->connect_error);
}
// Prepare SQL query to select places with the specified name
$sql = "SELECT PlaceID FROM Place WHERE PlaceName = '" . $place_name . "'";

// Execute SQL query
$result = $conn->query($sql);

// Check if any rows were returned
if ($result->num_rows > 0) {
    // Fetch the first row
    $row = $result->fetch_assoc();
    // Echo the ID of the top place
    echo $row["PlaceID"];
} else {
    // No places found with the specified name
    echo -1;
}

// Close database connection
$conn->close();
?>