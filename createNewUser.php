<?php

$database_host = "dbhost.cs.man.ac.uk";
$database_user = "j35393lo";
$database_pass = "filmclub";
$database_name = "2023_comp10120_cm7";

$conn = new mysqli($database_host, $database_user, $database_pass, $database_name);

if (!$conn) {
	die("Connection failed: " . $conn->connect_error);
}
echo ("Connected Successfully<br>");

$data = json_decode(file_get_contents("php://input"), true);
$sql = "INSERT INTO User (Username, PasswordHash, Email, UserID, Salt)
VALUES ('" . $data['username'] . "', '" . $data['passwordHash'] . "', '" . $data['email'] . "', " . $data['userID'] . ", '" . $data['salt'] . "')";
$result = $conn->query($sql);

if ($result == TRUE) {
  echo "New record created successfully";
} else {
  echo "Error record not created";
}

$conn->close();

?>