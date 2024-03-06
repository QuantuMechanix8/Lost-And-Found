<?php
//Gets the necessary data sent to the script from the form
$route_description = $_POST["route_description"];
$user_id = $_POST["user_id"];
$is_ordered = $_POST["is_ordered"];
$tag_id = $_POST["tag_id"];
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
$sql_max_id = "SELECT MAX(RouteID) AS max_id FROM Route";
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

$sql = "INSERT INTO Route (RouteID, RouteDesc, UserID, IsOrdered, DateCreated, TagID)
        VALUES ($next_id, '$route_description', $user_id, $is_ordered, '$today', '$tag_id')";

//Sending back the outcome
if ($conn->query($sql) === TRUE) {
    echo $next_id;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>