<?php

$database_host = "dbhost.cs.man.ac.uk";
$database_user = "j35393lo"; // use own username
$database_pass = "filmclub"; // use own password
$database_name = "2023_comp10120_cm7";

$conn = new mysqli($database_host, $database_user, $database_pass, $database_name);

if (!$conn) {
	die("Connection failed: " . $conn->connect_error);
}

echo ("Connected Successfully<br>");

$sql = "SELECT Username, UserID FROM User";
$result = $conn->query($sql);

if (mysqli_num_rows($result) > 0) {
  while($row = $result->fetch_assoc()) {
    echo "Username: " . $row["Username"]. " - UserID: " . $row["UserID"]. " " . "<br>";
  }
} else {
  echo "0 Results";
}

$conn->close();

?>