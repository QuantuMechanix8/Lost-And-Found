<?php

$database_host = "dbhost.cs.man.ac.uk";
$database_user = "s89990lo"; // use own username
$database_pass = "Immortal1"; // use own password
$database_name = "2023_comp10120_cm7";

$conn = new mysqli($database_host, $database_user, $database_pass, $database_name);

if (!$conn) {
	die("Connection failed: " . $conn->connect_error);
}

echo ("Connected Successfully<br>");

$sql = "SELECT PlaceID, PlaceName, PlaceDesc, Location, UserID, DateCreated FROM Place";
$result = $conn->query($sql);

if (mysqli_num_rows($result) > 0) {
  while($row = $result->fetch_assoc()) {
    echo "PlaceID: " . $row["PlaceID"]. " - PlaceName: " . $row["PlaceName"]. " - PlaceDesc: " . $row["PlaceDesc"]. " - Location: " . $row["Location"]. " - UserID: " . $row["UserID"]. " - DateCreated: " . $row["DateCreated"]. " " . "<br>";
  }
} else {
  echo "0 Results";
}

$conn->close();

?>